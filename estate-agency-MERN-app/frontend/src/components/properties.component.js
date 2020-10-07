import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const apiServerURL = "http://localhost:5000/"

export default class PropertyCompnent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            properties: []
        }
    }

    componentDidMount() {
        axios.get(apiServerURL + "properties/").then(res => {
            this.setState({
                properties: res.data
            })
        })
    }

    getPropertyList = () => {
        const propertyArr = this.state.properties
        return (
            propertyArr.map(elem => {
                return (
                    <tr key={elem._id}>
                        <td>{elem.property_address}</td>
                        <td>{elem.property_type}</td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <h3>Properties</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <td><b>Address</b></td>
                            <td><b>Type</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getPropertyList()}
                    </tbody>
                </table>
                <div>
                    <Link className="btn btn-success" to="/newProperty">Create New Property</Link>
                </div>
            </div>
        )
    }

}
