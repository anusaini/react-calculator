import React from 'react'
import './Buttons.css'

const Action = ({onButtonPress, op}) => {
    const handleClick = () => {
        onButtonPress(op)
    }
    return (
        <div className="button action" onClick={handleClick}>
            {op}
        </div>
    ) 
}

export default Action
