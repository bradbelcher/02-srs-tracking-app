import React, { useState, useEffect } from 'react';

function CreateSalesPersonForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');


const handleFirstNameChange = (event) => {
    const value = event.target.value
    setFirstName(value);
}

const handleLastNameChange = (event) => {
    const value = event.target.value
    setLastName(value);
}

const handleEmployeeIdChange = (event) => {
    const value = event.target.value
    setEmployeeId(value);
}


  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {};
    data.first_name = firstName;
    data. last_name = lastName;
    data.employee_id = employeeId;


    const cspUrl = "http://localhost:8090/api/salespeople/";
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(cspUrl, fetchOptions);
    if (response.ok) {
      setFirstName('');
      setLastName('');
      setEmployeeId('');
    } else {
        console.error('failed to create salesperson')
    }
  }

  return (
    <div className="row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a New Salesperson</h1>
            <form onSubmit={handleSubmit} id="add-salesperson-form">
            <div className="col">
            <div className="form-floating mb-3">
                <input required onChange={handleFirstNameChange} value={firstName} placeholder="First name" type="text" id="first_name" name="first_name" className="form-control" />
                <label htmlFor="first_name">First Name</label>
            </div>
            </div>
            <div className="col">
            <div className="form-floating mb-3">
                <input required onChange={handleLastNameChange} value={lastName} placeholder="Last name" type="text" id="last_name" name="last_name" className="form-control" />
                <label htmlFor="last_name">Last Name</label>
            </div>
            </div>
            <div className="col">
            <div className="form-floating mb-3">
                <input required onChange={handleEmployeeIdChange} value={employeeId} placeholder="ST(number)" type="text" id="employee_id" name="employee_id" className="form-control" />
                <label htmlFor="employee_id">Employee ID</label>
            </div>
            </div>

            <button className="btn btn-primary">Add SalesPerson</button>
            </form>
        </div>
    </div>
    </div>
  )

}

export default CreateSalesPersonForm;
