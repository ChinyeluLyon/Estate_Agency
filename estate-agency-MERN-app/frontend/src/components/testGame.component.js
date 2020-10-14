import React from 'react'
import '../styling/gameGrid.css'

export default class TestGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            xAxis: ['a', 'b', 'c', 'd', 'e'],
            yAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            wholeGrid: null,
            p1Soldiers: 1,
            p2Soldiers: 1,
            p1Money: '0',
            p2Money: '0'
        }
    }
    // createGgrid = () => {
    componentDidMount(){
        const x = this.state.xAxis
        const y = this.state.yAxis
        const eachButton = []
        const whole = []

        for (let i = 0; i < y.length; i++) {

            for (let j = 0; j < x.length; j++) {
                eachButton.push(<button className="gridBox" key={i + " " + j}></button>)
                // eachButton.push(<button key={i + " " + j}>{x[j] + " " + i}</button>)
            }
        }

        for (let k = 0; k < eachButton.length; k = k + 5) {
            whole.push(
                <div key={k}>
                    {eachButton[k]}
                    {eachButton[k + 1]}
                    {eachButton[k + 2]}
                    {eachButton[k + 3]}
                    {eachButton[k + 4]}
                </div>
            )
        }

        this.setState({ wholeGrid: whole })
    }

    placePieces = () => {
        this.setState({ hi: 'tesy' })

        return 0
    }


    render() {
        return (
            <div>
                <h3>Test-Game</h3>
                {this.state.wholeGrid}
            </div>
        )
    }
}