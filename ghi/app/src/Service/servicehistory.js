import React, { useEffect, useState } from "react";
import "./tables.css";

function Servicehistory() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

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
      setAppointments(data.appointments);
    } catch (error) {
      console.error(
        "An error occurred while fetching the appointments:",
        error
      );
    }
  }

  // Fetch appointments data on component mount
  useEffect(() => {
    console.log("Component mounted. Fetching appointments data...");
    fetchAppointmentsData();
  }, []);

  // Filter appointments based on the search input
  const filteredAppointments = appointments.filter((appointment) =>
    appointment.vin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-2">Service History</h1>
        <input
          type="text"
          placeholder="Search by VIN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => {
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
                <td>{appointment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Servicehistory;
