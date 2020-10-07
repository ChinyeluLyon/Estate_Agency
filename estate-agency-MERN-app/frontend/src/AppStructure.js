import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './bootstrap-4.1.3-dist/css/bootstrap.min.css'

import NavbarComponent from './components/navbar.component'
import CustomersComponent from './components/customers.component'
import AddCustomerComponent from './components/addCustomer.component'
import EditCustomerComponent from './components/editCustomer.component'
import PropertyComponent from './components/properties.component'
import AddPropertyComponent from './components/addProperty.component'

export default function AppStructure() {
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <Route path='/customers' exact component={CustomersComponent} />
        <Route path='/newCustomer' exact component={AddCustomerComponent} />
        <Route path='/editCustomer/:id' exact component={EditCustomerComponent} />
        <Route path='/properties' exact component={PropertyComponent} />
        <Route path='/newProperty' exact component={AddPropertyComponent} />
      </Router>
    </div>
  )
}
