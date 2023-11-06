from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_automobilevo", kwargs={"vin": self.vin})


class SalesPerson(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    employee_id = models.CharField(max_length=10, unique=True)

    # def get_api_url(self):
    #     return reverse("salesperson", kwargs={"pk": self.id})


class Customer(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=10)

    # def get_api_url(self):
    #     return reverse("customer", kwargs={"pk": self.id})


class Sale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )

    # def get_api_url(self):
    #     return reverse("customer", kwargs={"pk": self.id})
