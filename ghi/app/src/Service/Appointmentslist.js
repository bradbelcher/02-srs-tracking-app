import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./tables.css";

function Appointmentslist() {
  const [appointments, setAppointments] = React.useState([]);
  const navigate = useNavigate();

  // Fetch appointments data from the API
  async function fetchAppointmentsData() {
    try {
      console.log("Fetching appointments data...");
      const response = await fetch("http://localhost:8080/api/appointments/");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch appointments. Status: ${response.status}`
        );
      }
      const data = await response.json();
      const pendingAppointments = data.appointments.filter(
        (appointment) => appointment.status === "pending"
      );
      setAppointments(pendingAppointments);
    } catch (error) {
      console.error(
        "An error occurred while fetching the appointments:",
        error
      );
    }
  }

  // Schedule a new appointment
  function scheduleAppointment() {
    navigate("/scheduleappointment/");
  }

  // Cancel an appointment by ID
  async function cancelAppointment(id) {
    try {
      console.log(`Cancelling appointment with ID: ${id}`);
      const response = await fetch(
        `http://localhost:8080/api/appointments/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "canceled" }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to cancel appointment. Status: ${response.status}`
        );
      }
      fetchAppointmentsData();
    } catch (error) {
      console.error(
        "An error occurred while cancelling the appointment:",
        error
      );
    }
  }

  // Finish an appointment by ID
  async function finishAppointment(id) {
    try {
      console.log(`Finishing appointment with ID: ${id}`);
      const response = await fetch(
        `http://localhost:8080/api/appointments/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "finished" }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to finish appointment. Status: ${response.status}`
        );
      }
      fetchAppointmentsData();
    } catch (error) {
      console.error(
        "An error occurred while finishing the appointment:",
        error
      );
    }
  }

  // Fetch appointments data on component mount
  useEffect(() => {
    console.log("Component mounted. Fetching appointments data...");
    fetchAppointmentsData();
  }, []);

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-2">Current Scheduled Appointments</h1>
        <p className="lead">
          Here is a list of currently scheduled appointments
        </p>
      </div>
      <button onClick={scheduleAppointment} className="btn btn-lg btn-success">
        Schedule a Service Appointment!
      </button>
      <table className="table table-hover table-custom table-striped ">
        <thead>
          <tr>
            <th>VIN</th>
            <th>VIP</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const date = new Date(appointment.date_time);
            const dateString = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(date);
            const timeString = new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(date);
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.vip ? "Yes" : "No"}</td>
                <td>{appointment.customer}</td>
                <td>{dateString}</td>
                <td>{timeString}</td>
                <td>
                  {appointment.technician.first_name}{" "}
                  {appointment.technician.last_name}
                </td>
                <td>{appointment.reason}</td>
                <td>
                  <button
                    onClick={() => cancelAppointment(appointment.id)}
                    className="cancel-button"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => finishAppointment(appointment.id)}
                    className="finish-button"
                  >
                    FINISH
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Appointmentslist;
