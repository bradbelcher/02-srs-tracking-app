import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Technicianform() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const response = await fetch("http://localhost:8080/api/technicians/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/technicians");
      } else {
        const responseBody = await response.text();
        console.error("HTTP error", response.status, responseBody);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="row form-container">
      <div className="offset-3 col-6">
        <div className="shadow p-5">
          <h1 className="form-header">Add a New Technician</h1>
          <form onSubmit={handleSubmit} id="technician-form">
            <div className="form-floating mb-3">
              <input
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <button className="btn btn-primary create-button">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Technicianform;
