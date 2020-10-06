import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const apiServerURL = "http://localhost:5000/"

export default class CustomersComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        axios.get(apiServerURL + 'customers/').then(res => {
            this.setState({
                customers: res.data
            })
            console.log(this.state.customers)
        }).catch(err => {
            console.log("component error: " + err)
        })
    }

    editCustomer = (customerId) => {
        window.location = '/editCustomer'
    }

    deleteCustomer = (customerId) => {
        axios.delete(apiServerURL + "customers/" + customerId).then((res) => {
            console.log('delete func: ' + res)
            // window.location = '/'
            this.setState({
                customers: this.state.customers.filter((elem) => {
                    return elem._id !== customerId
                })
            })
        }).catch(err => {
            console.log(err)
        })

    }

    getCustomerList = () => {
        const customers = this.state.customers
        return (
            customers.map(elem => {
                return (
                    <tr key={elem._id}>
                        <td>{elem.customer_name}</td>
                        <td>{elem.customer_email}</td>
                        <td><Link to={'/editCustomer/' + elem._id}>Edit</Link> | <a href='#' onClick={() => { this.deleteCustomer(elem._id) }}>Delete</a></td>
                    </tr>
                )
            })
        )
    }

    openAddPage = () => {
        window.location = '/newCustomer'
    }


    render() {
        return (
            <div>
                <h3>Customers</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Email</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody >
                        {this.getCustomerList()}
                    </tbody>
                </table>
                <button type="button" className="btn btn-success" onClick={() => { this.openAddPage() }}>Create a Customer</button>
            </div>
        )
    }
}