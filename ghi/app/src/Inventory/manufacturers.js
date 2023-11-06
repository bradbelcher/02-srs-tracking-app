import React, { useEffect, useState } from "react";

function ManufacturerList() {
  const [manufacturers, setManufacturer] = useState([]);

  async function loadManufacturer() {
    const response = await fetch("http://localhost:8100/api/manufacturers/");
    if (response.ok) {
      const data = await response.json();
      setManufacturer(data.manufacturers);
    }
  }

  useEffect(() => {
    loadManufacturer();
  }, []);

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">Vehicle Manufacturers</h1>
      </div>
      <table className="table table-hover table-striped ">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((props) => {
            return (
              <tr key={props.id}>
                <td>{props.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ManufacturerList;
