import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './bootstrap-4.1.3-dist/css/bootstrap.min.css'

import HomeComponent from './components/home.component'
import CustomersComponent from './components/customers.component'
import NavbarComponent from './components/navbar.component'
import AddCustomerComponent from './components/addCustomer.component'
import EditCustomerComponent from './components/editCustomer.component'
import PropertyComponent from './components/property.component'

export default function AppStructure() {
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <Route path='/' exact component={HomeComponent} />
        <Route path='/customers' exact component={CustomersComponent} />
        <Route path='/newCustomer' exact component={AddCustomerComponent} />
        <Route path='/editCustomer/:id' exact component={EditCustomerComponent} />
        <Route path='/property' exact component={PropertyComponent} />
      </Router>
    </div>
  )
}
