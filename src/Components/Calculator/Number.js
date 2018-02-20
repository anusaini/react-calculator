import React from 'react'
import './Buttons.css'

const Number = ({numericValue, onButtonPress}) => {
    const handleClick = () => {
        onButtonPress(numericValue)
    }
    return (
        <div className="button calculator-number" onClick={handleClick}>
            {numericValue}
        </div>
    )
}

export default Number
