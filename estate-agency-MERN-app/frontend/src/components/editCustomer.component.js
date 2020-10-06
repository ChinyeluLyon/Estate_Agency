import React, { Component } from 'react'
import axios from 'axios'
const apiServerURL = "http://localhost:5000/"

export default class addCustomer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer_name: '',
            customer_email: '',
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get(apiServerURL + "customers/" + this.props.match.params.id).then(res => {
            this.setState({
                customer_name: res.data.customer_name,
                customer_email: res.data.customer_email
            })
            console.log("Got Customer Data: " + res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        axios.post(apiServerURL + 'customers/edit/' + this.props.match.params.id, this.state).then(res => {
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
                <form onSubmit={this.onSubmit}>
                    <h3>Edit Customer: {this.state.customer_name}</h3>
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
