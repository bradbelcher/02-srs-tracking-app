# The Show-Room Shepherd Project

Team:

- Brad Belcher - The service microservice
- Baiyu Hua - The sales microservice
  ​

## Design

Welcome to The Show-Room Shepherd Project, an application designed for car dealerships in need of an integrated assets and human resources management system! The design of this project is to create RESTful API calls to 3 different microservices: Inventory, Sales, and Service. The front-end of the application uses React, the back-end of the application uses Django, and the database used is PostgreSQL.

## Application Features

- This Application can Create & List:

  - Automobile Manufacturers
  - Automobile Models
  - Automobiles in Inventory

  - Salespeople
  - Customers
  - Sales

  - Technicians
  - Serice Appointments

** Please be aware this is a beta application, you may experience service outage with some features! **

#### Cloning the Repository

- In a terminal, change directories to one that you can clone this project into.
- Type this command into your terminal: `git clone `
- Switch directories to this project directory.

## Instructions to run the application

This application runs by building Docker containers and Docker images. Please have Docker Desktop downloaded in order to continue on with the instructions below:

1. Ensure you are in your desired directory in your terminal.
2. From your terminal, clone the repository with git clone https://gitlab.com/harryhua2021
3. With Docker Desktop installed, run the following commands in your terminal:
   (Please Download Docker Desktop@ https://www.docker.com/products/docker-desktop/)

---

        * `docker volume create beta-data`
        * `docker-compose build`
        * `docker-compose up`

---

4. When finished, service should be running and can be accessed on ports defined in your Docker Container window.

## Navigation with URLs

- The server uses `http://localhost:3000` as the Home Page. When entering that into your browser, you will see a navigation bar. Below is a breakdown of each URL and what feature it links to:
  ​

#### CarCar Project Diagram:

#### Vehicle Models:

​
| Feature | URL |
|:-----------------|:-------------|
|List vehicle models|http://localhost:3000/models|
|Create vehicle models| http://localhost:3000/models/new|
​

#### Automobiles:

​
| Feature | URL |
|:-----------------|:-------------|
|List automobiles| http://localhost:3000/automobiles/all|
|Create automobiles| http://localhost:3000/automobiles/new|
​

#### Manufacturers:

​
| Feature | URL |
|:-----------------|:-------------|
|List manufactureres|http://localhost:3000/manufacturers|
|Add a manufactureres|http://localhost:3000/manufacturers/new|
​

#### Service Microservice:

​
| Feature | URL |
|:-----------------|:-------------|
|List service appointments| http://localhost:3000/appointments/list|
|Create service appointments| http://localhost:3000/appointments/new|
|List service history based VIN| http://localhost:3000/services/new|
|Create a technicion| http://localhost:3000/technicians/new|
​

#### Sales Microservice:

​
| Feature | URL |
|:-----------------|:-------------|
|Add a Sales Record|http://localhost:3000/salesrecords/new/|
|Add a customer|http://localhost:3000/customers/new/|
|Add a Sales Person|http://localhost:3000/salesperson/new|
|List of all sales|http://localhost:3000/salesrecords/|
|List Sales by Sales Person from drop down selection|http://localhost:3000/salesperson/history/|
​

## Context Map Diagrams

- Below is a diagram of the back-end and front-end of the project and how they connect:
  ![Diagram using ExcaliDraw](/img/Project%20Beta%20Context%20Map.png)
  ​
  ​

## Service microservice - From the developer Brad Belcher

​
For the service microservies, I created AutomobileVO, Technician, and Appointment as my models. Then I added a foreign key into my Appointment model to get access to my Technician model. I created a poller that created objects for me by polling from the inventory API.
​
In the back-end for Services Microservice under the views.py (path is service/api/service_rest/views.py) I first created functions for each model to ensure that the back-end data is being stored and created properly. After, I went into the Urls.py, which was empty at the time, and created paths for the models in my views.py. I used insomnia to test if the paths I had set up were working properly.
​

#### Services Microservice RESTful API calls:

​
| Feature | Method | URL |
|:-----------------|:----------------|:-------------|
|Create Technician| POST |http://localhost:8080/api/technicians/|
|Create Service appointment| POST |http://localhost:8080/api/appointments/|
|Create Service appointment| GET |http://localhost:8080/api/appointments/|
|List Technicians| GET |http://localhost:8080/api/technicians/|
|List Appointments| GET |http://localhost:8080/api/appointments/|
|View Appointments| GET |http://localhost:8080/api/appointments/|
|View Service History| POST |http://localhost:8080/api/appointments/|

​
​

## Sales microservice - From the developer Baiyu Hua

​
For the Sales microservice, I had created models that include AutomobileVO, SalesPeson, Customer, and SalesRecord. Since Automobiles data was in the microservice of Inventory, the creation of a value object called Automobile was necessary in order to grab that existing data. To grab this data, I implemented a function called 'poll' in order to grab the data.
​
In the back-end for Sales Microservice under the views.py (path is sales/api/sales_rest/views.py) I have impolemented view functions for each model to properly ensure that the back-end data is being created properly and stored properly. To ensure this was correct, I utilized Insomnia to perform my RESTful API calls.

The Sales functionality keeps track of automobile sales that come from the inventory. A person cannot sell a car that is not listed in the inventory, nor can a person sell a car that is already been sold. it lives on port 8090.
​
To ensure proper creation, the Sales Record model would need a creation of an Automobile from the Inventory service first, Sales Person and Customer added based off the properties of the models, and then entering a price for the sale. Please see below for the ports and URLs to make these API calls:

​

#### Sales Microservice RESTful API urls:

​
| Feature | Method | URL |
|:-----------------|:----------------|:-------------|
|List Sales Record| GET |http://localhost:8090/api/salesrecords/|
|Show Sales Record Details| GET |http://localhost:8090/api/salesrecords/|
|Create Sales Record| POST |http://localhost:8090/api/salesrecords/|
|List Customers| GET |http://localhost:8090/api/customers/|
|Show Customer Details| GET |hhttp://localhost:8090/api/customers/enterIDNumber|
|Create a Customer| POST |http://localhost:8090/api/customers/|
|List Sales People| GET |http://localhost:8090/api/salespersons/|
|Show Sales Person Details| GET |http://localhost:8090/api/salespersons/enterIDNumber|
|Create a Sales Person| POST |http://localhost:8090/api/salespersons/|

#### Sales Microservice RESTful API calls:

**Salesperson**

GET:
JSON output
{
"salesperson": [
{
"id": 1,
"first_name": "John",
"last_name": "Doe",
"employee_id": "0123456789"
},

POST:
JSON request body:
{
"first_name": "Lebron",
"last_name": "James",
"employee_id": "1111845786"
}
JSON output:
{
"id": 14,
"first_name": "Lebron",
"last_name": "James",
"employee_id": "1111845786"
}

DELETE:
JSON output
{
"deleted": true
}

**Customer**

GET:
JSON output
{
"customer":
{
"id": 5,
"first_name": "Brad",
"last_name": "Pitt",
"address": "4321 Hollywood blvd, Los Angeles, CA 33022",
"phone_number": "3108889888"
},
}

POST:
JSON request body:
{
"first_name": "lynn",
"last_name": "Vuu",
"address": "1111 Beach ave, Los Angeles, CA 33022",
"phone_number": "3108999367"
}
JSON output:
{
"id": 8,
"first_name": "lynn",
"last_name": "Vuu",
"address": "1111 Beach ave, Los Angeles, CA 33022",
"phone_number": "3108999367"
}
DELETE:
JSON output
{
"deleted": true
}

**Sale**

GET:
JSON output
{
"sales":
{
"id": 5,
"price": 45000,
"salesperson": {
"first_name": "Jane",
"last_name": "Dow",
"employee_id": "0987654321"
},
"customer": {
"id": 8
"first_name": "Baiyu",
"last_name": "Hua",
"address": "1234 Chestnut St, Denver, CO 80012",
"phone_number": "7202772987"
}
"automobile

POST:
JSON request body:
{
"first_name": "lynn",
"last_name": "Vuu",
"address": "1111 Beach ave, Los Angeles, CA 33022",
"phone_number": "3108999367"
}
JSON output:
{
"id": 8,
"first_name": "lynn",
"last_name": "Vuu",
"address": "1111 Beach ave, Los Angeles, CA 33022",
"phone_number": "3108999367"
}
"automobile": {
"vin": "1E1AT1F59S7192859"
}
DELETE:
JSON output
{
"deleted": true
}

Services Microservice:
Technicians:
GET:
JSON output:
{
"id": 4,
"date_time": "2023-07-29T13:30:00Z",
"reason": "Open Recalls for Repair",
"vin": "1FVACYDC37HW59012",
"customer": "Luke Skywalker",
"status": "pending",
"vip": false,
"technician": {
"id": 3,
"first_name": "Donald",
"last_name": "Trump",
"employee_id": "d.trump"
}
},

POST:
JSON INPUT:
{
"date_time": "2023-07-31 11:30",
"reason": "Extensive damage from car accident",
"vin": "WD2YD241825356884",
"customer": "Lucy Lui",
"technician": 4,
"status": "pending"
}
JSON OUTPUT
{
"date_time": "2023-07-31 11:30",
"reason": "Extensive damage from car accident",
"vin": "WD2YD241825356884",
"customer": "Lucy Lui",
"status": "pending",
"technician": {
"id": 4,
"first_name": "Homer",
"last_name": "Simpson"
}
}

DEL:
JSON OUTPUT:
{
"message": "Appointment deleted."
}

PUT-CANCELED
JSON INPUT:
{
"status": "canceled"
}
JSON OUTPUT:
{
"id": 2,
"date_time": "2023-07-30T14:30:00Z",
"reason": "Routine checkup",
"vin": "1HGCM82633A123456",
"customer": "Kim Kardashian",
"status": "canceled",
"technician": {
"id": 1,
"first_name": "John",
"last_name": "Doe"
}
}

PUT: - FINISHED
JSON INPUT:
{
"status": "finished"
}
JSON OUTPUT:
{
"id": 3,
"date_time": "2023-07-29T09:30:00Z",
"reason": "Oil Change",
"vin": "JH4KA3250JC001616",
"customer": "Roboute Guilliman",
"status": "finished",
"technician": {
"id": 2,
"first_name": "Max",
"last_name": "Power"
}
}

Appointments:
GET
JSON OUTPUT:
{
"id": 1,
"first_name": "John",
"last_name": "Doe",
"employee_id": "j.doe"
},

POST:
JSON INPUT:
{
"first_name": "Brandon",
"last_name": "Web"
}
JSON OUTPUT:
{
"id": 12,
"first_name": "Brandon",
"last_name": "Web",
"employee_id": "b.web"
}

DEL:
JSON OUTPUT:
{
"message": "Technician deleted."
}

Notes on Service Micoservice from Brad Belcher

In a few instances I made some changes that I felt were more appropriate for the product. Since these changes may impact my grade I felt I should explain them.

On all the forms I designed I used a useNavigate hook to bring the client back to the list page associated with whatever item you created in a form. I did this primarily for flow purposes. I felt it was far more likely that only one car or one new technician would be input at a time, but it also allows the client to see the the changes to the list immediately and show that their data was input and saved.

Technician Form:
there are only two input values, first and last name. I did this because I created a function that automatically created an employee ID based on the first letter of their first name and their last name. I felt an end user would appreciate employee ID geing auto generated in the same consistant format rather than a user choosing whatever they wanted. It would make changing the filtering and organization easier later on we wanted to do additional changes and filtering. The grading rubric states it should have an employee ID input, but if you look at tehcnicianlist you will see that each employee does get an id.
