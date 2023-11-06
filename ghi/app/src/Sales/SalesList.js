import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);

    async function loadSales() {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }

    useEffect(() => {
        loadSales();
    }, []);

    return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson Employee ID</th>
              <th>Salesperson Name</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sl => {
              return (
                <tr key={sl.id}>
                  <td>{ sl. salesperson.employee_id }</td>
                  <td>{ sl. salesperson.first_name } { sl. salesperson.last_name }</td>
                  <td>{ sl. customer. first_name } { sl. customer.last_name }</td>
                  <td>{ sl. automobile.vin }</td>
                  <td>{ sl.price }</td>
                </tr>
            )
        })}

    </tbody>
</table>
)
}
export default SalesList;
