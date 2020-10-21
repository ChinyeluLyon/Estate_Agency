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
            classArray: Array(gridArea).fill('gridBox'),
        }
    }


    clickBox = (event) => {
        let boxNum = event.target.value

        switch (this.state.mode) {
            case "place":
                console.log("place mode")
                let tempArr = this.state.grid
                tempArr[boxNum] = 'X'
                this.setState({
                    grid: tempArr
                })
                break;
            case "move":
                console.log("move mode")
                if (this.state.grid[boxNum] === "X") {
                    this.displayPath(boxNum)
                }
                else if (this.state.classArray[boxNum] === "path") {
                    this.detectMovement(boxNum)
                }
                else {
                    // clear the path
                    let selectionArr = Array(this.state.gridHeight * this.state.gridWidth).fill('gridBox')
                    this.setState({
                        classArray: selectionArr
                    })
                }
                break;

            default:
                break;
        }
    }


    displayPath = (boxNum) => {
        let steps = 2;

        boxNum = parseInt(boxNum)
        // let rowSelectedBox = Math.floor(boxNum / 5)
        // let columnSelectedBox = boxNum - (rowSelectedBox * 5)
        let tempClassNameArr = Array(this.state.gridHeight * this.state.gridWidth).fill('gridBox')
        tempClassNameArr[boxNum] = "selectedPiece"
        for (let i = 0; i < steps; i++) {
            let up = boxNum - (this.state.gridWidth * (i + 1))
            let down = (boxNum + (this.state.gridWidth * (i + 1)))
            let left = boxNum - (i + 1)
            let right = boxNum + (i + 1)

            tempClassNameArr[up] = 'path'
            tempClassNameArr[down] = 'path'
            tempClassNameArr[left] = 'path'
            tempClassNameArr[right] = 'path'
            this.setState({
                classArray: tempClassNameArr
            })
        }
    }

    detectMovement = (boxNum) => {
        let pieceStartPos = this.state.classArray.indexOf("selectedPiece")
        let pieceEndPos = boxNum
        let tempGrid = this.state.grid
        tempGrid[pieceStartPos] = ""
        tempGrid[pieceEndPos] = "X"

        this.setState({
            grid: tempGrid,
            classArray: Array(this.state.gridHeight * this.state.gridWidth).fill('gridBox')
        })


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
                        className={this.state.classArray[count - 1]}
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