import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './bootstrap-4.1.3-dist/css/bootstrap.min.css'

import AllCustomersComponent from './components/allCustomers.component'
import NavbarComponent from './components/navbar.component'

export default function AppStructure() {
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <Route path='/customers' exact component={AllCustomersComponent} />
      </Router>
    </div>
  )
}
