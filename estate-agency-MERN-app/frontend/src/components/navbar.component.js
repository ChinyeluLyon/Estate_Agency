import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {
    render() {
        return (
            <div className='navbar navbar-dark bg-dark'>
                <Link to='/' className='navbar-brand'>Orbital Estates</Link>
                <Link to='/customers' className='nav-link '>Customers</Link>
            </div>
        )
    }
}