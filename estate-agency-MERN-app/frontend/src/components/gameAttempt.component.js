import React from 'react'
import '../styling/gameGrid.css'

export default class TestGame extends React.Component {
    constructor(props) {
        super(props)

        let gridArr = Array(50).fill("")
        //start pieces
        // gridArr[2] = 'X'
        // gridArr[47] = 'X'

        this.state = {
            test: gridArr,
            unselectedBox: 'gridBox',
            selectedBox: 'selectedBox',
        }
    }


    clickBox = (event) => {
        // alert(event.target.value)
        let boxNum = event.target.value

        // let temparr = this.state.test
        let temparr = Array(50).fill("")

        temparr[boxNum] = 'X'

        this.setState({
            test: temparr
        })
    }

    mouseDownBox = (event) => {
        event.target.className = this.state.selectedBox
        console.log(event)
    }
    mouseUpBox = (event) => {
        event.target.className = this.state.unselectedBox
    }


    createGrid = () => {
        let xArr = []
        let yArr = []
        let count = 0

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 5; j++) {
                count++
                xArr.push(
                    <button 
                    className={this.state.unselectedBox} 
                    key={count - 1} 
                    onMouseDown={this.mouseDownBox} 
                    onMouseUp={this.mouseUpBox} 
                    onClick={this.clickBox} 
                    value={count - 1}
                    >
                        {this.state.test[count - 1]}
                    </button>
                )
            }
            yArr.push(
                <div key={i}>
                    {xArr}
                </div>
            )
            xArr = []
        }

        return yArr
    }

    displayRaduis = () => {

    }

    render() {
        return (
            <div>
                <h1 >Game Test</h1>
                <br />
                <div className="wholeGame">
                    {this.createGrid()}
                </div>
            </div>
        )
    }
}