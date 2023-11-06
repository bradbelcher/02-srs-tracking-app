import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./index.css";
import srsicon from "./images/srsicon.png";

function Nav() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const closeNavbar = () => {
    if (!isNavCollapsed) {
      setIsNavCollapsed(true);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" onClick={closeNavbar}>
          <img src={srsicon} className="img-fluid" alt="Logo" style={{ maxHeight: '3vw' }} />
        </NavLink>
        <button
          className={"navbar-toggler" + (isNavCollapsed ? '' : ' collapsed')}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse" + (isNavCollapsed ? '' : ' show')} id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item"> 
              <NavLink className="nav-link" to="/customers" onClick={closeNavbar}>
                Customer Record
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/form" onClick={closeNavbar}>
                Add a Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/servicehistory" onClick={closeNavbar}>
                Service History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments" onClick={closeNavbar}>
                Service Appointments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/scheduleappointment/" onClick={closeNavbar}>
                Create a Service Appointment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales" onClick={closeNavbar}>
                Sales Record
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/form" onClick={closeNavbar}>
                Add a New Sale
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/saleshistory" onClick={closeNavbar}>
                Salesperson History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople" onClick={closeNavbar}>
                Salesperson
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople/form" onClick={closeNavbar}>
                Add a Salesperson
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers" onClick={closeNavbar}>
                Manufacturers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturerform" onClick={closeNavbar}>
                Add a Manufacturer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models" onClick={closeNavbar}>
                Models
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/modelform" onClick={closeNavbar}>
                Add a Model
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles" onClick={closeNavbar}>
                Automobiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobileform" onClick={closeNavbar}>
                Add an Automobile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians" onClick={closeNavbar}>
                Technicians
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/addtechnician" onClick={closeNavbar}>
                Add a Technician
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}    
          
            
export default Nav;
