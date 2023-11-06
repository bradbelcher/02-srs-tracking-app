from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ('id', 'first_name', 'last_name', 'employee_id')

    def default(self, obj):
        return {prop: getattr(obj, prop) for prop in self.properties}


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = (
        'id',
        'date_time',
        'reason',
        'vin',
        'customer',
        'status',
        'vip',
    )

    def default(self, obj):
        if isinstance(obj, self.model):
            result = super().default(obj)
            result['technician'] = TechnicianEncoder().default(obj.technician)
            result['vip'] = obj.vip  # Include 'VIP' property in the result
            return result
        return super().default(obj)


def check_vin(vin):
    try:
        AutomobileVO.objects.get(vin=vin)
        return True
    except AutomobileVO.DoesNotExist:
        return False


@require_http_methods(['GET', 'POST'])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {'technicians': [TechnicianEncoder().default(tech) for tech in technicians]},
            safe=False,
        )
    else:
        content = json.loads(request.body)
        technician, created = Technician.objects.get_or_create(
            first_name=content['first_name'],
            last_name=content['last_name']
        )
        if created:
            return JsonResponse(
                TechnicianEncoder().default(technician),
                safe=False,
            )
        else:
            response = JsonResponse(
                {'message': 'Technician already exists.'},
            )
            response.status_code = 400
            return response


@require_http_methods(['DELETE', 'GET'])
def api_technicians(request, pk):
    try:
        technician = Technician.objects.get(id=pk)
    except Technician.DoesNotExist:
        response = JsonResponse({'message': 'Technician does not exist.'})
        response.status_code = 404
        return response

    if request.method == "GET":
        return JsonResponse(
            TechnicianEncoder().default(technician),
            safe=False,
        )
    elif request.method == "DELETE":
        technician.delete()
        return JsonResponse(
            {'message': 'Technician deleted.'},
            safe=False,
        )


@require_http_methods(['GET', 'POST'])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {'appointments': [AppointmentEncoder().default(app) for app in appointments]},
            safe=False,
        )
    else:
        content = json.loads(request.body)
        technician_id = content.pop('technician', None)
        if technician_id is not None:
            try:
                technician = Technician.objects.get(id=technician_id)
            except Technician.DoesNotExist:
                return JsonResponse({'message': 'Technician does not exist.'}, status=404)
            content['technician'] = technician

        # Check if the VIN exists in the AutomobileVO model
        vin = content.get('vin')
        if vin is not None:
            automobile_qs = AutomobileVO.objects.filter(vin=vin)
            if automobile_qs.exists():
                vip_status = True
            else:
                vip_status = False

            # Update the 'VIP' property in the appointment content
            content['vip'] = vip_status

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            AppointmentEncoder().default(appointment),
            safe=False,
        )


@require_http_methods(['DELETE', 'GET', 'PUT'])
def api_appointments(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        response = JsonResponse({'message': 'Appointment does not exist.'})
        response.status_code = 404
        return response

    if request.method == "GET":
        return JsonResponse(
            AppointmentEncoder().default(appointment),
            safe=False,
        )
    elif request.method == "DELETE":
        appointment.delete()
        return JsonResponse(
            {'message': 'Appointment deleted.'},
            safe=False,
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        if 'status' in content:
            if content['status'] in ['finished', 'canceled']:
                appointment.status = content['status']
                appointment.save()
                return JsonResponse(
                    AppointmentEncoder().default(appointment),
                    safe=False
                )
            else:
                response = JsonResponse({'message': 'Invalid status.'})
                response.status_code = 400
                return response
        else:
            response = JsonResponse({'message': 'Missing status.'})
            response.status_code = 400
            return response
