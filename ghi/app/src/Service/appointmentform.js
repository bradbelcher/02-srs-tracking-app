import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Import the format function from date-fns
import "./tables.css";
import { useNavigate } from "react-router-dom";

function Appointmentform() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    vin: "",
    customer: "",
    reason: "",
    date: null, // Initialize the date with the current date
    time: "", // Initialize the time with an empty string
    technicians: [],
    technician: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/technicians/");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setFormState((prevState) => ({
          ...prevState,
          technicians: data.technicians,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTechnicians();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedDate = format(formState.date, "yyyy-MM-dd"); // Format the date
    const formattedTime = format(new Date(formState.time), "HH:mm"); // Format the time
    const datetime = `${formattedDate}T${formattedTime}:00`;

    try {
      const response = await fetch("http://localhost:8080/api/appointments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date_time: datetime,
          reason: formState.reason,
          vin: formState.vin,
          customer: formState.customer,
          technician: formState.technician,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setFormState({
        vin: "",
        customer: "",
        reason: "",
        date: new Date(),
        time: "",
        technicians: formState.technicians,
        technician: "",
      });

      navigate("/appointments");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="row form-container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="form-header">Schedule a Service Appointment!</h1>
          <form onSubmit={handleSubmit} id="appointment-form">
            <div className="form-floating mb-3">
              {!formState.vin && <label htmlFor="vin">Vehicle VIN</label>}
              <input
                className="form-control"
                id="vin"
                type="text"
                name="vin"
                placeholder="VIN"
                value={formState.vin}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-floating mb-3">
              {!formState.customer && (
                <label htmlFor="customer">Customer</label>
              )}
              <input
                className="form-control"
                id="customer"
                type="text"
                name="customer"
                placeholder="Customer"
                value={formState.customer}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-floating mb-3">
              {!formState.date && <label htmlFor="date">Choose a Date</label>}
              <DatePicker
                id="date"
                className="form-control"
                selected={formState.date}
                onChange={(date) =>
                  setFormState((prevState) => ({ ...prevState, date }))
                }
                placeholderText="Choose a date"
                dateFormat="MM/dd/yyyy"
                required
              />
            </div>
            <div className="form-floating mb-3">
              {!formState.time && <label htmlFor="time">Choose a Time</label>}
            </div>
            <div className="form-floating mb-3">
              {!formState.time && <label htmlFor="time">Choose a Time</label>}
              <DatePicker
                id="time"
                className="form-control"
                selected={formState.time}
                onChange={(time) =>
                  setFormState((prevState) => ({ ...prevState, time }))
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText="Choose a time"
                required
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="technician"></label>
              <select
                className="form-select"
                id="technician"
                name="technician"
                value={formState.technician}
                onChange={handleFormChange}
              >
                <option value="">Choose Technician</option>
                {formState.technicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.first_name} {tech.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              {!formState.reason && <label htmlFor="reason">Reason</label>}
              <input
                className="form-control"
                id="reason"
                type="text"
                name="reason"
                placeholder="Reason"
                value={formState.reason}
                onChange={handleFormChange}
                required
              />
            </div>
            <button className="btn btn-primary create-button">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Appointmentform;
