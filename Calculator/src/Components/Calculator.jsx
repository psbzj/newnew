import React from 'react'
import { useState } from 'react'


const Calculator = () => {

    const [value, setValue] = useState('0');
    const [storedValue, setStoredValue] = useState('');
    const [operator, setOperator] = useState('');

    let total = 0;

    const handleNumberClick = (digit) => {
        setValue((prev) => (prev === '0' ? digit : prev + digit))
    };

    const handleClear = () => {
        setValue('0');
    };

    const handleOperator = (button) => {
        //if there is an operator, perform stored value (operator) value and set as stored value, then store operator as new operator input. if there is operator but only stored value, no current value, then do nothing.

        setOperator(button)
        setStoredValue(value)
        setValue('0')

        
    }

    const handleAllClear = () => {
        setValue('0');
        setStoredValue('');
        setOperator('');
    };

    const handleBackspace = () => {
        setValue((prev) => (prev.length > 1 ? prev.slice(0,-1): '0'));
    };

    const handleCalculate = () => {
        //if there is an operator, value 1 and value 2, it calculates and displays total as value in calculator and clear operator and stored value. maybe it stops concatenation on to the total value?
        
    }

  return (
    <div>
        <div id="calculator-container">
            <div id="header">
            <h1>Calculator</h1>
        </div>
        <div id='screen'>
            <p id='stored-value'>{storedValue} {operator}</p>
            <p id='curr-value'>{value}</p>
        </div>
        <div id="calculator-buttons">
            <button onClick={handleClear}>C</button>
            <button onClick={handleAllClear}>AC</button>
            <button onClick={handleBackspace}>&larr;</button>
            <button onClick={() => handleOperator('*')}>*</button>
            
            <button onClick={() => handleNumberClick('7')}>7</button>
            <button onClick={() => handleNumberClick('8')}>8</button>
            <button onClick={() => handleNumberClick('9')}>9</button>
            <button onClick={() => handleOperator('/')}>/</button>

            <button onClick={() => handleNumberClick('4')}>4</button>
            <button onClick={() => handleNumberClick('5')}>5</button>
            <button onClick={() => handleNumberClick('6')}>6</button>
            <button onClick={() => handleOperator('+')}>+</button>

            <button onClick={() => handleNumberClick('1')}>1</button>
            <button onClick={() => handleNumberClick('2')}>2</button>
            <button onClick={() => handleNumberClick('3')}>3</button>
            <button onClick={() => handleOperator('-')}>-</button>
            

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
