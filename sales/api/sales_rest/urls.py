from django.urls import path
from .views import (api_list_salespeople,
                    api_salespeople_detail,
                    api_list_customer,
                    api_customer_detail,
                    api_list_sales,
                    api_sales_detail,
                    )


urlpatterns = [
    path("salespeople/<int:id>/", api_salespeople_detail, name="api_salespeople_detail"),
    path("salespeople/", api_list_salespeople, name="api_list_salespeople"),
    path("customers/<int:id>/", api_customer_detail, name="api_show_customer"),
    path("customers/", api_list_customer, name="api_list_customer"),
    path("sales/<int:id>/", api_sales_detail, name="api_show_sales"),
    path("sales/", api_list_sales, name="api_list_sales"),
]
