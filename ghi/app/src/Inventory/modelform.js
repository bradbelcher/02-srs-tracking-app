import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ModelForm() {
  const [modelName, setModelName] = useState("");
  const [pictureUrl, setPictureUrl] = useState(""); // changed this from picture_Url to pictureUrl
  const [manufacturerId, setManufacturer] = useState(""); // changed this from manufacturer_id to manufacturerId
  const [manufacturers, setManufacturers] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    } else {
      console.error("Error retrieving location data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModelChange = (event) => {
    const value = event.target.value;
    setModelName(value);
  };

  const handlePictureChange = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const handleManufacturerChange = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = modelName;
    data.picture_url = pictureUrl;
    data.manufacturer_id = manufacturerId;

    console.log("Sending data:", data);

    const Url = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(Url, fetchConfig);

    if (response.ok) {
      console.log("Response:", await response.json());
    } else {
      console.log("Response:", response.status, await response.text());
    }

    if (response.ok) {
      navigate("/models");
    } else {
      console.error("Error sending form");
    }
  };

  return (
    <div className="row form-container">
      <div className="offset-3 col-6">
        <div className="shadow p-5">
          <h1 className="form-header">Add a New Model</h1>
          <form onSubmit={handleSubmit} id="model-form">
            <div className="form-floating mb-3">
              <input
                required
                onChange={handleModelChange}
                value={modelName}
                placeholder="Model Name"
                name="modelName"
                type="text"
                id="model_name"
                className="form-control"
              />
              <label htmlFor="model_name">Model Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                onChange={handlePictureChange}
                value={pictureUrl} // changed this from picture_Url to pictureUrl
                placeholder="Color"
                type="url"
                id="picture_url"
                name="pictureUrl" // changed this from pictureUrl to picture_url
                className="form-control"
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleManufacturerChange}
                value={manufacturerId} // changed this from manufacturer_id to manufacturerId
                name="manufacturerId" // changed this from manufacturer to manufacturerId
                className="form-select"
                required
              >
                <option>Choose a Manufacturer</option>
                {manufacturers.map((manu) => {
                  return (
                    <option value={manu.id} key={manu.id}>
                      {manu.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary create-button">Add Model</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModelForm;
