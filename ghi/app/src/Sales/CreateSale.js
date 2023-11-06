import { useState, useEffect } from "react";


function CreateSalesForm(){
    const [autos, setAutomobiles] = useState([]);
    const [automobile, setAutomobile] = useState("");
    const [salespersons, setSalespersons] = useState([]);
    const [salesperson, setSalesperson] = useState("");
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState("");
    const [price, setPrice] = useState("");


    const fetchAutoData = async() => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
        } else {
            console.error('failed to retrieve data')
        }
      }

    const fetchSalespersonData = async() => {
        const sUrl = await fetch("http://localhost:8090/api/salespeople/");
        const response = await fetch(sUrl);
        if (response.ok){
        const data = await response.json()
            setSalespersons(data.salesperson)
          } else {
            console.error('failed to retrieve data')
          }
        }

    const fetchCustomerData = async() => {
        const cUrl = await fetch("http://localhost:8090/api/customers/");
        const response = await fetch(cUrl);
        if (response.ok){
        const data = await response.json()
            setCustomers(data.customer)
            } else {
            console.error('failed to retrieve data')
            }
        }

    useEffect(() => {
        fetchAutoData();
        fetchSalespersonData();
        fetchCustomerData();
    }, []);

  const handleAutomobileChange = (event) => {
        const value = event.target.value
        setAutomobile(value);
    }

  const handleSalesPersonChange = (event) => {
        const value = event.target.value
        setSalesperson(value);
    }

  const handleCustomerChange = (event) => {
        const value = event.target.value
        setCustomer(value);
    }


  const handlePriceChange = (event) => {
        const value = event.target.value
        setPrice(value);
    }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {};
      data.automobile = automobile;
      data.salesperson = salesperson;
      data.customer = customer;
      data.price = price;

    const data_iv = {}
    data_iv.sold = true
    const saleUrl = 'http://localhost:8090/api/sales/'
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        }
    }
    console.log(automobile)
        const ivUrl = `http://localhost:8100/api/automobiles/${automobile}/`
        const fetchConfig2 = {
            method: "put",
            body: JSON.stringify(data_iv),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(saleUrl, fetchConfig);
        const response2 = await fetch(ivUrl, fetchConfig2)
        if (response.ok && response2.ok) {
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');


        } else {
            console.error('Error sending form data')
        }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1 className="card-title">Add a sale</h1>
                <form onSubmit={handleSubmit} id="create-auto-form">
                <div className="mb-3">
                    <select onChange={handleAutomobileChange} value={automobile} name="automobiles" id="automobiles" className="form-select" required>
                        <option value="">Automobile VIN</option>
                        {autos.filter(obj => obj.sold === false).map(auto=>{
                        return(
                            <option value={auto.vin} key={auto.vin}>
                                {auto.vin}
                            </option>
                        )
                    })
                }
                </select>
                </div>
        <div className="mb-3">
        <select onChange={handleSalesPersonChange} value={salesperson} name="salesperson" id="salesperson" className="form-select" required>
            <option value="">Salesperson</option>
            {salespersons.map(sp => (
                <option value={sp.id} key={sp.id}>
                    {sp.first_name} {sp.last_name}
                </option>
            ))}
        </select>
        </div>

        <div className="mb-3">
        <select onChange={handleCustomerChange} value={customer} name="customers" id="customers" className="form-select" required>
            <option value="">Customer</option>
            {customers.map(cm => (
                <option value={cm.id} key={cm.id}>
                    {cm.first_name} {cm.last_name}
                </option>
            ))}
        </select>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                    <input required onChange={handlePriceChange} value={price} placeholder="Price" type="text" id="price" name="price" className="form-control" />
                    <label htmlFor="price">Price</label>
                    </div>
                </div>
                <button className="btn btn-primary">Create a Sale</button>

                </form>
            </div>
        </div>
        </div>
    )

    }

export default CreateSalesForm;
