import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tables.css";

function Technicianlist() {
  const [technicians, setTechnicians] = useState([]);
  const navigate = useNavigate();

  async function fetchTechnicians() {
    try {
      const response = await fetch("http://localhost:8080/api/technicians/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTechnicians(data.technicians);
    } catch (error) {
      console.error("An error occurred while fetching the technicians:", error);
    }
  }

  function createTechnician() {
    navigate("/addtechnician/");
  }

  async function deleteTechnician(id) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/technicians/${id}/`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTechnicians();
    } catch (error) {
      console.error("An error occurred while deleting the technician:", error);
    }
  }

  useEffect(() => {
    fetchTechnicians();
  }, []);

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-2">Our Current Technician Team!</h1>
        <p className="lead">
          Here is a list of the current technicians team members! If there are
          any technicians not listed, please feel free to add them by clicking
          the button below!
        </p>
      </div>
      <button onClick={createTechnician} className="btn btn-lg btn-success">
        Add New Team Member!
      </button>
      <table className="table table-hover table-custom table-striped ">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.first_name}</td>
              <td>{technician.last_name}</td>
              <td>{technician.employee_id}</td>
              <td>
                <button
                  onClick={() => delete deleteTechnician(technician.id)}
                  className="delete-technician"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Technicianlist;
