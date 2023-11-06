import React from "react";
import { NavLink } from "react-router-dom";
import "./cards.css";
import customer from "./images/customer.jpg";
import appointment from "./images/appointment.jpg";
import sales from "./images/sales.jpg";
import autos from "./images/autos.jpg";
import technician from "./images/technician.jpg";
import showroomlogo from "./images/srslogo1.png";

function MainPage() {
  return (
    <div className="px-4 py-2 my-2 text-center">
      <img src={showroomlogo} className="img-fluid" alt="responsive image" />
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership management!
        </p>
      </div>
      <div
        className="container"
        style={{
          maxWidth: "1000px",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <div className="row row-cols-2 row-cols-md-3 rows-cols-lg-5 g-4">
          <div className="col">
            <div className="card">
              <img src={customer} className="card-img-top" alt="Customer" />
              <div className="card-body">
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/customers">
                    List of Customers
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/customers/form">
                    Add a Customer
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/automobiles">
                    Automobiles
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/automobileform">
                    Add an Automobile
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/servicehistory">
                    Service History
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src={appointment} className="card-img-top" />
              <div className="card-body">
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/appointments">
                    Service Appointments
                  </NavLink>
                </div>              
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/scheduleappointment/">
                    Create a Service Appointment
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src={sales} className="card-img-top" />
              <div className="card-body">
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/sales">
                    Sales Record
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/sales/form">
                    Add a New Sale
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/salespeople">
                    Salesperson
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/salespeople/form">
                    Add a Salesperson
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/saleshistory">
                    Salesperson History
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src={autos} className="card-img-top" />
              <div className="card-body">
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/manufacturers">
                    Manufacturers
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/manufacturerform">
                    Add a Manufacturer
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/models">
                    Models
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/modelform">
                    Add a Model
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src={technician} className="card-img-top" />
              <div className="card-body">
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/technicians">
                    Technicians
                  </NavLink>
                </div>
                <div className="nav-item-custom">
                  <NavLink className="nav-link" to="/addtechnician">
                    Add a Technician
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
