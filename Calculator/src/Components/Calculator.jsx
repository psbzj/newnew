import React from 'react'
import { useState } from 'react'


const Calculator = () => {

    const [value, setValue] = useState('0');
    const [storedValue, setStoredValue] = useState('');
    const [operator, setOperator] = useState('');

    const handleNumberClick = (digit) => {
        setValue((prev) => (prev === '0' ? digit : prev + digit))
    }

    const handleClear = () => {
        setValue('0');
    }

    const handleAllClear = () => {
        setValue('0');
        setStoredValue('');
        setOperator('');
    }

  return (
    <div>
        <div id="calculator-container">
            <div id="header">
            <h1>Calculator</h1>
        </div>
        <div id='screen'>
            <p>{storedValue} {}</p>
            <p>{value}</p>
        </div>
        <div id="calculator-buttons">
            <button onClick={() => handleClear()}>C</button>
            <button onClick={() => handleAllClear()}>AC</button>
            <button>&larr;</button>
            <button>*</button>
            
            <button onClick={() => handleNumberClick('7')}>7</button>
            <button onClick={() => handleNumberClick('8')}>8</button>
            <button onClick={() => handleNumberClick('9')}>9</button>
            <button>/</button>

            <button onClick={() => handleNumberClick('4')}>4</button>
            <button onClick={() => handleNumberClick('5')}>5</button>
            <button onClick={() => handleNumberClick('6')}>6</button>
            <button>+</button>

            <button onClick={() => handleNumberClick('1')}>1</button>
            <button onClick={() => handleNumberClick('2')}>2</button>
            <button onClick={() => handleNumberClick('3')}>3</button>
            <button>-</button>
            

            <button onClick={() => handleNumberClick('0')}>0</button>
            <button>00</button>
            <button >.</button>
            <button >=</button>
        </div>
        </div>
    </div>
    
  )
}

export default Calculator
