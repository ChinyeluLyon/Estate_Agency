import React from 'react'
import axios from 'axios'
const apiServerURL = "http://localhost:5000/"

export default class addCustomer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            customer_name: '',
            customer_email: '',
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        axios.post(apiServerURL + 'customers/add', this.state).then(res => {
            console.log(res.data + " added!")
            window.location = '/customers'
        }).catch(err => {
            console.log(err)
        })
    }

    onChangeName = (event) => {
        this.setState({
            customer_name: event.target.value
        })
    }

    onChangeEmail = (event) => {
        this.setState({
            customer_email: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h3>New Customer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input required value={this.state.customer_name} onChange={this.onChangeName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input required value={this.state.customer_email} onChange={this.onChangeEmail} className="form-control" />
                    </div>
                    <div>
                        <input className="btn" type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}
