import React from 'react'
import '../styling/gameGrid.css'

export default class TestGame extends React.Component {
    constructor(props) {
        super(props)

        const gridWidth = 10
        const gridHeight = 10
        const gridArea = gridWidth * gridHeight

        let gridArr = Array(gridArea).fill("")
        //start pieces
        // gridArr[2] = 'X'
        // gridArr[47] = 'X'

        this.state = {
            gridWidth: gridWidth,
            gridHeight: gridHeight,
            grid: gridArr,
            mode: 'place',
            classSelection: Array(gridArea).fill('gridBox'),
        }
    }


    clickBox = (event) => {
        let boxNum = event.target.value

        switch (this.state.mode) {
            case "place":
                console.log("place mode")
                let temparr = this.state.grid
                temparr[boxNum] = 'X'
                this.setState({
                    grid: temparr
                })
                break;
            case "move":
                console.log("move mode")
                this.displayRaduis(boxNum)
                break;

            default:
                break;
        }


    }

    mouseDownBox = (event) => {
        console.log("clicked on")
        // event.target.className = this.state.selectedBox
        // console.log(event)
    }
    mouseUpBox = (event) => {
        console.log("clicked off")
        // event.target.className = this.state.unselectedBox
    }


    clickPlace = () => {
        this.setState({
            mode: "place"
        })
    }

    clickMove = () => {
        this.setState({
            mode: "move"
        })
    }

    createGrid = () => {
        let xArr = []
        let yArr = []
        let count = 0
        for (let i = 0; i < this.state.gridHeight; i++) {
            for (let j = 0; j < this.state.gridWidth; j++) {
                count++
                xArr.push(
                    <button
                        className={this.state.classSelection[count - 1]}
                        key={count - 1}
                        onMouseDown={this.mouseDownBox}
                        onMouseUp={this.mouseUpBox}
                        onClick={this.clickBox}
                        value={count - 1}
                    >
                        {this.state.grid[count - 1]}
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

    displayRaduis = (boxNum) => {
        let steps = 2;

        boxNum = parseInt(boxNum)
        // let rowSelectedBox = Math.floor(boxNum / 5)
        // let columnSelectedBox = boxNum - (rowSelectedBox * 5)
        let tempClassNameArr = Array(this.state.gridHeight * this.state.gridWidth).fill('gridBox')

        for (let i = 0; i < steps; i++) {
            let up = boxNum - (this.state.gridWidth * (i + 1))
            let down = (boxNum + (this.state.gridWidth * (i + 1)))
            let left = boxNum - (i + 1)
            let right = boxNum + (i + 1)

            tempClassNameArr[up] = 'selectedBox'
            tempClassNameArr[down] = 'selectedBox'
            tempClassNameArr[left] = 'selectedBox'
            tempClassNameArr[right] = 'selectedBox'
            this.setState({
                classSelection: tempClassNameArr
            })
        }
        // selected.props.className = this.state.selectedBox
    }

    render() {
        return (
            <div>
                <h1>Game Attempt</h1>
                <button onClick={this.clickPlace}>Place</button>
                <button onClick={this.clickMove}>Move</button>
                <br />
                <div className="wholeGame">
                    {this.createGrid()}
                </div>
            </div>
        )
    }
}