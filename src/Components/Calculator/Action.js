import React, { Component } from 'react'
import './Buttons.css'

class Action extends Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick () {
        this.props.onButtonPress(this.props.op)
    }
    render() {
        return (
            <div className="button action" onClick={this.handleClick}>
                {this.props.op}
            </div>
        ) 
    }
}

export default Action
