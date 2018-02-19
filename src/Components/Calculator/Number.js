import React, { Component } from 'react'
import './Buttons.css'

class Number extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onButtonPress(this.props.numericValue)
    }

    render() {
        return (
            <div className="button calculator-number" onClick={this.handleClick}>
                {this.props.numericValue}
            </div>
        )
    }
}

export default Number
