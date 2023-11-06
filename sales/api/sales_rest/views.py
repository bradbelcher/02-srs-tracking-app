from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, Sale


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "id",
    ]


class SalespersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.all()
            return JsonResponse(
                {"salesperson": salesperson},
                encoder=SalespersonEncoder,
                status=200,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Cannot find salesperson"},
                status=404
            )
    else:
        content = json.loads(request.body)
        try:
            salesperson = SalesPerson.objects.create(**content)
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
                status=200,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "No known Salesperson"},
                status=404
            )


@require_http_methods(["GET", "DELETE"])
def api_salespeople_detail(request, pk):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
                status=200,
            )
        except Exception as e:
            return JsonResponse(
                {"message": e},
                status=404
            )
    else:
        try:
            count, _ = SalesPerson.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson not found"},
                status=404
            )


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        try:
            customer = Customer.objects.all()
            return JsonResponse(
                {"customer": customer},
                encoder=CustomerEncoder,
                status=200,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Cannot find customer data"},
                status=404,
            )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
                status=200,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "No known customer"},
                status=404
            )


@require_http_methods(["GET", "DELETE"])
def api_customer_detail(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
                status=200,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer with this ID does not exist"},
                status=404
            )
    else:
        try:
            count, _ = Customer.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer with this ID does not exist"},
                status=404
            )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        try:
            sale = Sale.objects.all()
            return JsonResponse(
                {"sales": sale},
                encoder=SaleEncoder,
                status=200,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Cannot find Sale data"},
                status=404
            )
    else:
        content = json.loads(request.body)
        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile

            employee_id = content["salesperson"]
            salesperson = SalesPerson.objects.get(id=employee_id)
            content["salesperson"] = salesperson

            id = content["customer"]
            customer = Customer.objects.get(id=id)
            content["customer"] = customer

            sale = Sale.objects.create(**content)

            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
                status=200,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "No Automobile with this VIN"},
                status=404
                )

        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "This salesperson does not exist"},
                status=404
            )

        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "This customer does not exist"},
                status=404
            )


@require_http_methods(["GET", "DELETE"])
def api_sales_detail(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "No Sale data available"}
            )
    else:
        try:
            count, _ = Sale.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Can not delete, ID returns not matching sales data"},
                status=400
            )
