import React from 'react'
import '../styling/gameGrid.css'

export default class TestGame extends React.Component {
    constructor(props) {
        super(props)

        const gridWidth = 8
        const gridHeight = 8
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
            player1Money: 50,
            player2Money: 50,
            currentTurn: 1,
            currentTurnPiece: "X",
            pieceCost: 10
        }
    }


    clickBox = (event) => {
        let boxNum = event.target.value

        switch (this.state.mode) {
            case "place":
                console.log("place mode")
                let currentPlayerMoney = this.state.currentTurn === 1 ? this.state.player1Money : this.state.player2Money

                if (currentPlayerMoney - this.state.pieceCost >= 0 && this.state.grid[boxNum] === "") {
                    let tempArr = this.state.grid
                    tempArr[boxNum] = this.state.currentTurnPiece
                    this.state.currentTurn === 1 ?
                        (this.setState({
                            player1Money: this.state.player1Money - this.state.pieceCost
                        })) : (this.setState({
                            player2Money: this.state.player2Money - this.state.pieceCost
                        }))

                    this.setState({
                        grid: tempArr
                    })
                } else if (currentPlayerMoney - this.state.pieceCost < 0) {
                    alert("Out of funds")
                }
                break;
            case "move":
                console.log("move mode")
                if (this.state.grid[boxNum] === this.state.currentTurnPiece) {
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
        for (let i = 1; i <= steps; i++) {
            tempBoxNum = tempBoxNum - this.state.gridWidth
            let tempBoxNum2 = tempBoxNum
            for (let ii = 0; ii < (steps - i); ii++) {
                tempBoxNum2++
                tempClassNameArr[tempBoxNum2] = "path"
            }
        }
        let tempBoxNum3 = boxNum
        for (let j = 1; j <= steps; j++) {
            tempBoxNum3 = tempBoxNum3 - this.state.gridWidth
            let tempBoxNum4 = tempBoxNum3
            for (let ji = 0; ji < (steps - j); ji++) {
                tempBoxNum4--
                tempClassNameArr[tempBoxNum4] = "path"
            }
        }
        let tempBoxNum5 = boxNum
        for (let k = 1; k <= steps; k++) {
            tempBoxNum5 = tempBoxNum5 + this.state.gridWidth
            let tempBoxNum6 = tempBoxNum5
            for (let ki = 0; ki < (steps - k); ki++) {
                tempBoxNum6++
                tempClassNameArr[tempBoxNum6] = "path"
            }
        }
        let tempBoxNum7 = boxNum
        for (let l = 1; l <= steps; l++) {
            tempBoxNum7 = tempBoxNum7 + this.state.gridWidth
            let tempBoxNum8 = tempBoxNum7
            for (let li = 0; li < (steps - l); li++) {
                tempBoxNum8--
                tempClassNameArr[tempBoxNum8] = "path"
            }
        }

        //calc bounds 
        let row = Math.floor(boxNum / this.state.gridWidth)
        let column = boxNum - (row * this.state.gridWidth)
        let spaceRight = this.state.gridWidth - column - 1

        if (column < steps) {
            let remainingRight = this.state.gridWidth - (column + steps)
            for (let iterator = 0; iterator < this.state.gridHeight; iterator++) {
                let limitR = (this.state.gridWidth * iterator) + (column + steps + 1)
                for (let index = 0; index < remainingRight - 1; index++) {
                    tempClassNameArr[limitR + index] = "gridBox"
                }
            }
        }
        else if (spaceRight < steps) {
            let remainingLeft = (column - steps - 1)
            for (let i = 0; i < this.state.gridHeight; i++) {
                let startL = (i * this.state.gridWidth)
                for (let j = 0; j < (remainingLeft + 1); j++) {
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
        tempGrid[pieceEndPos] = this.state.currentTurnPiece

        this.setState({
            grid: tempGrid,
            classArray: Array(this.state.gridHeight * this.state.gridWidth).fill('gridBox')
        })
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

    switchTurn = () => {
        if (this.state.currentTurn === 1) {
            this.setState({
                currentTurn: 2,
                currentTurnPiece: "O"
            })
        }
        else {
            this.setState({
                currentTurn: 1,
                currentTurnPiece: "X"
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
                <h1>War-Game</h1>
                <h2>It's Player {this.state.currentTurn}'s turn</h2>
                <h2>Player 1: £{this.state.player1Money}</h2>
                <h2>Player 2: £{this.state.player2Money}</h2>
                <button onClick={this.clickPlace}>Place</button>
                <button onClick={this.clickMove}>Move</button>
                <button onClick={this.switchTurn}>End Turn</button>
                <br />
                <div className="wholeGame">
                    {this.createGrid()}
                </div>
            </div>
        )
    }
}