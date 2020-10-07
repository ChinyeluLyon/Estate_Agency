import React from 'react'
import axios from 'axios'
const apiServerURL = "http://localhost:5000/"

export default class AddProperty extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            property_address: null,
            property_type: null,
            num_bedrooms: null,
            deal_type: null,
            rental_price: null,
            rental_type: null,
            buy_price: null,
            details: null
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
console.log(this.state)
        axios.post(apiServerURL + 'properties/add', this.state).then(res => {
            console.log(res.data + " added!")
            window.location = '/properties'
        }).catch(err => {
            console.log(err)
        })
    }

    onChangeAddress = (event) => {
        this.setState({
            property_address: event.target.value
        })
    }

    onChangeType = (event) => {
        this.setState({
            property_type: event.target.value
        })
    }

    onChangeBedrooms = (event) => {
        this.setState({
            num_bedrooms: event.target.value
        })
    }

    onChangeDealType = (event) => {
        this.setState({
            deal_type: event.target.value
        })
    }
    onChangeRentPrice = (event) => {
        this.setState({
            rental_price: event.target.value
        })
    }
    onChangeRentType = (event) => {
        this.setState({
            rental_type: event.target.value
        })
    }
    onChangeBuyPrice = (event) => {
        this.setState({
            buy_price: event.target.value
        })
    }
    onChangeDetails = (event) => {
        this.setState({
            details: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h3>New Property</h3>
                <form className="form-group">
                    <div>
                        <label>Address:</label>
                        <input required className="form-control" onChange={this.onChangeAddress} type="text" />
                    </div>
                    <div>
                        <label>Type:</label>
                        <input required className="form-control" onChange={this.onChangeType} type="text" />
                    </div>
                    <div>
                        <label>Number Of Bedrooms:</label>
                        <input required className="form-control" onChange={this.onChangeBedrooms} type="text" />
                    </div>
                    <div>
                        <label>Deal Type:</label>
                        <input required className="form-control" onChange={this.onChangeDealType} type="text" />
                    </div>
                    <div>
                        <label>Rent Price:</label>
                        <input required className="form-control" onChange={this.onChangeRentPrice} type="text" />
                    </div>
                    <div>
                        <label>Rent Type:</label>
                        <input required className="form-control" onChange={this.onChangeRentType} type="text" />
                    </div>
                    <div>
                        <label>Buy Price:</label>
                        <input required className="form-control" onChange={this.onChangeBuyPrice} type="text" />
                    </div>
                    <div>
                        <label>Details:</label>
                        <input required className="form-control" onChange={this.onChangeDetails} type="text" />
                    </div>
                    <div>
                        <input className="btn" value="Create A New Property" onClick={this.onSubmit} type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}
