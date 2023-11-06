import { useState, useEffect } from "react";

function CustomerList() {
    const [customer, setCustomer] = useState([]);

    async function loadCustomer() {
        const response = await fetch('http://localhost:8090/api/customers/');

        if (response.ok) {
            const data = await response.json();
            setCustomer(data.customer)
        }
    }

    useEffect(() => {
        loadCustomer();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {customer.map(cm => {
                    return (
                        <tr key={cm.id}>
                            <td>{cm.first_name} {cm.last_name}</td>
                            <td>{cm.address}</td>
                            <td>{cm.phone_number}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CustomerList
