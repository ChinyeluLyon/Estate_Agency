import React from 'react'
import '../styling/gameGrid.css'

export default class TestGame extends React.Component {
    constructor(props) {
        super(props)

        const gridWidth = 13
        const gridHeight = 13
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

            tempClassNameArr[left] = 'path'
            tempClassNameArr[right] = 'path'
            tempClassNameArr[up] = 'path'
            tempClassNameArr[down] = 'path'

        }
        //calc diagonal positions
        let tempBoxNum = boxNum
        for (let j = 1; j <= steps; j++) {
            tempBoxNum = tempBoxNum - this.state.gridWidth
            let tempBoxNum2 = tempBoxNum
            for (let k = 0; k < (steps - j); k++) {
                tempBoxNum2++
                tempClassNameArr[tempBoxNum2] = "path"
            }
        }
        let tempBoxNum3 = boxNum
        for (let j = 1; j <= steps; j++) {
            tempBoxNum3 = tempBoxNum3 - this.state.gridWidth
            let tempBoxNum4 = tempBoxNum3
            for (let k = 0; k < (steps - j); k++) {
                tempBoxNum4--
                tempClassNameArr[tempBoxNum4] = "path"
            }
        }
        let tempBoxNum5 = boxNum
        for (let j = 1; j <= steps; j++) {
            tempBoxNum5 = tempBoxNum5 + this.state.gridWidth
            let tempBoxNum6 = tempBoxNum5
            for (let k = 0; k < (steps - j); k++) {
                tempBoxNum6++
                tempClassNameArr[tempBoxNum6] = "path"
            }
        }
        let tempBoxNum7 = boxNum
        for (let j = 1; j <= steps; j++) {
            tempBoxNum7 = tempBoxNum7 + this.state.gridWidth
            let tempBoxNum8 = tempBoxNum7
            for (let k = 0; k < (steps - j); k++) {
                tempBoxNum8--
                tempClassNameArr[tempBoxNum8] = "path"
            }
        }

        //calc bounds proper
        let row = Math.floor(boxNum / this.state.gridWidth)
        let column = boxNum - (row * this.state.gridWidth)
        let spaceRight = this.state.gridWidth - column - 1
        console.log("row " + row)
        console.log("column " + column)
        console.log("space left " + column)
        console.log("space right " + (this.state.gridWidth - column - 1))
        if (column >= steps && spaceRight >= steps) {
            console.log("fits fine")
        }
        else if (column < steps) {
            console.log("not enough on left")
            console.log("columns 0 to " + (column + steps))
            let remainingRight = this.state.gridWidth - (column + steps)
            for (let iterator = 0; iterator < this.state.gridHeight; iterator++) {
                let limitR = (this.state.gridWidth * iterator) + (column + steps + 1)
                console.log("limitR " + limitR)
                for (let index = 0; index < remainingRight - 1; index++) {
                    console.log("dbg: " + (limitR + index))
                    tempClassNameArr[limitR + index] = "gridBox"
                }
            }
        }
        else if (spaceRight < steps) {
            console.log("not enough on right")
            console.log("columns " + (column - steps) + " to " + (this.state.gridWidth - 1))
            let remainingLeft = (column - steps - 1)
            console.log("remainingLeft " + remainingLeft)
            for (let i = 0; i < this.state.gridHeight; i++) {
                console.log("startL: " + (i * this.state.gridWidth))
                let startL = (i * this.state.gridWidth)
                for (let j = 0; j < (remainingLeft + 1); j++) {
                    console.log(startL + j)
                    tempClassNameArr[startL + j] = "gridBox"
                }
            }
        }





        this.setState({
            classArray: tempClassNameArr
        })
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

    rightClick = (event) => {
        event.preventDefault();

        if (this.state.mode === "move") {
            this.setState({
                mode: "place"
            })
        }
        else {
            this.setState({
                mode: "move"
            })
        }

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
                        onContextMenu={this.rightClick}
                        value={count - 1}
                    >
                        {/* {count-1} */}
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