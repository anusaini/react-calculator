import React, { Component } from 'react'
import Number from './Number'
import Action from './Action'

import './Calculator.css'

class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            stack: [],
            history: ''
        }
        this.handleNumberPress = this.handleNumberPress.bind(this)
        this.handleActionPress = this.handleNumberPress.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleClearAll = this.handleClearAll.bind(this)
        this.handleCalculation = this.handleCalculation.bind(this)
        this.clearErrorMessage = this.clearErrorMessage.bind(this)
    }

    updateHistory(value) {
        return this.state.history + value
    }
    
    handleNumberPress(value) {
        this.setState(prevState => ({
            value: prevState.value.toString() + value,
            stack: [ ...prevState.stack, value ],
            history: this.updateHistory(value)
        }))
    }

    handleActionPress(action) {
        this.setState(prevState => ({
            value: prevState.value + action,
            stack: [ ...prevState.stack, action ],
            history: this.updateHistory(action)
        }))
    }

    handleClear(action) {
        this.setState(prevState => ({
            value: prevState.value.substr(0, prevState.value.length - 1),
            stack: [ ...prevState.stack, action ],
            history: this.updateHistory(action)
        }))
    }
 
    handleClearAll(action) {
        this.setState(prevState => ({
            value: '',
            stack: [ ],
            history: this.updateHistory(action)
        }))
    }

    processNextStateOnCalculation(prevState) {
        const result = eval(prevState.value) // of course a huge ass-library is required here. Don't eval.
        return ({
            value: result,
            stack: [ result ],
            history: this.updateHistory(`=${result}`)
        })        
    }

    handleCalculation() {
        const invalidityRE = new RegExp('[+-/*%]{2,}')
        const isInputInvalid = invalidityRE.test(this.state.value)
        if(isInputInvalid) {
            const errorMessage = 'Invalid value. Please check value.'
            console.error(errorMessage)
            this.setState(prevState => ({
                value: prevState.value,
                stack: prevState.stack,
                history: prevState.history,
                invalid: true,
                error: errorMessage
            }))
        } else {
            this.setState(this.processNextStateOnCalculation)
        }
    }
 
    clearErrorMessage() {
        this.setState(prevState => ({
            value: prevState.value,
            stack: prevState.stack,
            history: prevState.history,
            invalid: false,
            error: ''
        }))
    }

    render() {
        return (
            <div className="calculator">
                <div className="display">
                    <div className="lcdpanel value">
                        <div>{this.state.value}</div>
                        {
                            this.state.invalid
                            &&
                            <div className='error'>
                                {this.state.error}
                                <span onClick={this.clearErrorMessage} className="close">close</span>
                            </div>
                        }
                    </div>
                    <div className="history">history: {this.state.history}</div>
                </div>
                <div className="pad numeric-pad">
                    {[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => <Number key={n.toString()} numericValue={n} onButtonPress={this.handleNumberPress} />)}
                </div>
                <div className="pad action-pad">
                    {
                        [ 
                            { name: 'add', op: '+',  action: 'handleActionPress'},
                            { name: 'sub', op: '-',  action: 'handleActionPress'},
                            { name: 'mul', op: '*',  action: 'handleActionPress'},
                            { name: 'div', op: '/',  action: 'handleActionPress'},
                            { name: 'mod', op: '%',  action: 'handleActionPress'},
                            { name: 'eql', op: '=',  action: 'handleCalculation'},
                            { name: 'clr', op: 'C',  action: 'handleClear'},
                            { name: 'cla', op: 'AC', action: 'handleClearAll'}
                        ].map((action, index) => 
                            <Action key={index.toString()} op={action.op} onButtonPress={this[action.action]} />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Calculator
