import React from 'react'
import Axios from 'axios'
const apiServerURL = "http://localhost:5000/"

export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    onSubmit = (event) => {
        event.preventDefault()

        Axios.post(apiServerURL, { test: "test_data" }).catch(err => {
            console.log(err)
        })
        console.log(event.target.value)

    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input type="file" />
                    </div>
                    <br/>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}