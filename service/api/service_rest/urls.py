from django.urls import path
from .views import (
    api_list_technicians,
    api_technicians,
    api_list_appointments,
    api_appointments,
)


urlpatterns = [
    path('technicians/', api_list_technicians, name='api_list_technicians'),
    path('technicians/<int:pk>/', api_technicians, name='api_technicians'),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/", api_appointments, name="api_apointments"),

]