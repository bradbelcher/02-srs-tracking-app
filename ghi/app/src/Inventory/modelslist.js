import React, { useEffect, useState } from "react";
import "./tables.css";

function ModelList() {
  const [models, setModels] = useState([]);

  async function loadModels() {
    const response = await fetch("http://localhost:8100/api/models/");

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">Vehicle Models</h1>
      </div>
      <table className="table table-hover table-custom table-striped table-custom">
        <thead>
          <tr>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td>
                  <img
                    className="table-img"
                    alt="Unavailable"
                    src={model.picture_url}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ModelList;
