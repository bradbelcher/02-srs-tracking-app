import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import Technicianlist from "./Service/technicians";
import Technicianform from "./Service/technicianform";
import Appointmentslist from "./Service/Appointmentslist";
import Appointmentform from "./Service/appointmentform";
import Servicehistory from "./Service/servicehistory";
import CreateSalesPersonForm from "./Sales/CreateSalesPerson";
import CreateSalesForm from "./Sales/CreateSale";
import SalesList from "./Sales/SalesList";
import CreateCustomerForm from "./Sales/CreateCustomer";
import SalesPersonList from "./Sales/SalesPersonList";
import SalesPersonHistory from "./Sales/SalesPersonHistory";
import CustomerList from "./Sales/CustomerList";
import ManufacturersList from "./Inventory/manufacturers";
import ManufacturerForm from "./Inventory/manufacturerform";
import AutomobileList from "./Inventory/automobiles";
import AutomobileForm from "./Inventory/automobileform";
import ModelList from "./Inventory/modelslist";
import ModelForm from "./Inventory/modelform";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<Technicianlist />} />
          <Route path="/addtechnician" element={<Technicianform />} />
          <Route path="/appointments" element={<Appointmentslist />} />
          <Route path="/scheduleappointment" element={<Appointmentform />} />
          <Route path="/servicehistory" element={<Servicehistory />} />
          <Route path="/salespeople/form" element={<CreateSalesPersonForm />} />
          <Route path="/salespeople" element={<SalesPersonList />} />
          <Route path="/saleshistory" element={<SalesPersonHistory />} />
          <Route path="/sales/form" element={<CreateSalesForm />} />
          <Route path="/salespeople" element={<SalesList />} />
          <Route path="/customers/form" element={<CreateCustomerForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturerform" element={<ManufacturerForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobileform" element={<AutomobileForm />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/modelform" element={<ModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
