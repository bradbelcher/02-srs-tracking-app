import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ManufacturerForm() {
  const [manufacturerName, setManufacturerName] = useState("");
  const navigate = useNavigate();

  const handleManufacturerNameChange = (event) => {
    setManufacturerName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = manufacturerName;

    const url = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      navigate("/manufacturers");
    } else {
      console.error("Error sending form");
    }
  };

  return (
    <div className="row form-container">
      <div className="offset-3 col-6">
        <div className="shadow p-5">
          <h1 className="form-header">Create a Manufacturer</h1>
          <form onSubmit={handleSubmit} id="manufacturers-form">
            <div className="form-floating mb-3">
              <input
                required
                onChange={handleManufacturerNameChange}
                value={manufacturerName}
                placeholder="Manufacturer name"
                type="text"
                id="manufacturer_name"
                name="manufacturer_name"
                className="form-control"
              />
              <label htmlFor="manufacturer_name">Manufacturer Name</label>
            </div>
            <button className="btn btn-primary create-button">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
