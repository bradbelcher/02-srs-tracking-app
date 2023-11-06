import React, { useEffect, useState } from "react";

function AutomobileList() {
  const [autos, setAutos] = useState([]);

  async function loadAutos() {
    const response = await fetch("http://localhost:8100/api/automobiles/");

    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos);
    }
  }

  useEffect(() => {
    loadAutos();
  }, []);

  console.log(autos);

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">Automobiles</h1>
      </div>
      <table className="table table-hover table-striped ">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => {
            return (
              <tr key={auto.id}>
                <td>{auto.vin}</td>
                <td>{auto.model.manufacturer.name}</td>
                <td>{auto.model.name}</td>
                <td>{auto.year}</td>
                <td>{auto.color}</td>
                <td>{auto.sold ? "Sold" : "Available"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AutomobileList;
