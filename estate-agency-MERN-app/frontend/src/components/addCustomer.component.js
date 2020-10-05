import React, { Component } from 'react'

export default class addCustomer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer_id: '',
            customer_name: '',
            customer_email: '',
        }
    }

    onSubmit = (e) =>{
        e.preventDefault()

        //implement submit
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label>Name:</label>
                        <input className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" />
                    </div>
                    <div>
                        <input className="btn" type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}
