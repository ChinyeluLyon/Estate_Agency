import React from 'react'
import axios from 'axios'
const apiServerURL = "http://localhost:5000/"

export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null
        }
    }

    onSubmit = (event) => {
        event.preventDefault()

        const data = new FormData()
        data.append("file", this.state.file)

        axios.post(apiServerURL, data).then(res => {
            console.log("data posted")
            console.log(res.data)
            window.location = '/'
        }).catch(err => {
            console.log(err)
        })
    }

    onChangeHandler = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    render() {
        return (
            <div>
                <h5>Upload</h5>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div>
                        <input type="file" onChange={this.onChangeHandler} />
                    </div>
                    <br />
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}