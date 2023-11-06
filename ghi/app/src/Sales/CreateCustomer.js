import { useState, useEffect } from "react";

function CreateCustomerForm(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");


    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value);
    }

    const handleAddressChange = (event) => {
        const value = event.target.value
        setAddress(value);
    }

    const handlePhoneNumChange = (event) => {
        const value = event.target.value
        setPhoneNum(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNum

        const spUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(spUrl, fetchConfig);
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNum('');
        } else {
            console.error('failed to send form')
        }
    }
    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1 className="card-title">Add a customer</h1>
                <form onSubmit={handleSubmit} id="create-customer-form">
                <div className="col">
                    <div className="form-floating mb-3">
                    <input required onChange={handleFirstNameChange} value={firstName} placeholder="First name" type="text" id="first_name" name="first_name" className="form-control" />
                    <label htmlFor="first_name">First name</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                    <input required onChange={handleLastNameChange} value={lastName} placeholder="Last name" type="text" id="last_name" name="last_name" className="form-control" />
                    <label htmlFor="last_name">Last name</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                    <input required onChange={handleAddressChange} value={address} placeholder="ST<Number>" type="text" id="address" name="address" className="form-control" />
                    <label htmlFor="address">Address</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                    <input required onChange={handlePhoneNumChange} value={phoneNum} placeholder="XXXXXXXXXX" type="text" id="phone_number" name="phone_number" className="form-control" />
                    <label htmlFor="phone_number">Phone Number</label>
                    </div>
                </div>
                <button className="btn btn-primary">Add a customer</button>
                </form>
            </div>
        </div>
        </div>
    )

}

export default CreateCustomerForm;
