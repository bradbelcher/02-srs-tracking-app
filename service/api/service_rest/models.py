from django.db import models
from django.urls import reverse
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError


class AutomobileVO(models.Model):
    vin = models.CharField(
        max_length=17,
        validators=[
            RegexValidator(
                regex='^[A-HJ-NPR-ZO-9]{17}$',
                message='VIN must be 17 characters long and contain only uppercase letts (except I, O, Q) and numbers.',
                code='invalid_vin'
            )
        ]
    )
    id = models.IntegerField(primary_key=True)
    sold = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.id} - VIN: {self.vin}, Sold: {self.sold}"


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, blank=True, editable=False)

    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"id": self.pk})

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.id}"

    def clean(self):

        if not self.first_name:
            raise ValidationError("First name is required")
        if not self.last_name:
            raise ValidationError("Last name is required")

    def save(self, *args, **kwargs):
        self.employee_id = f"{self.first_name[0].lower()}.{self.last_name.lower()}"
        super(Technician, self).save(*args, **kwargs)


class Appointment(models.Model):
    pending = 'pending'
    canceled = 'canceled'
    finished = 'finished'

    status_choices = [
        (pending, 'pending'),
        (canceled, 'canceled'),
        (finished, 'finished'),
    ]

    date_time = models.DateTimeField()
    reason = models.CharField(max_length=100)
    vin = models.CharField(
        max_length=17,
        validators=[
            RegexValidator(
                regex='^[A-HJ-NPR-ZO-9]{17}$',
                message='VIN must be 17 characters long and contain only uppercase letts (except I, O, Q) and numbers.',
                code='invalid_vin'
            )
        ]
    )
    vip = models.BooleanField(default=False)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    status = models.CharField(max_length=25, choices=status_choices, default=pending)

    def get_api_url(self):
        return reverse("api_list_appointments", kwargs={"appointment_id": self.pk})

    def __str__(self):
        return f"{self.date_time} {self.reason} {self.vin} {self.customer} {self.technician} {self.status} {self.vip}"
