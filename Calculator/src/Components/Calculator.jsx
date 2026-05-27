import React from 'react'
import { useState, useEffect } from 'react'


const Calculator = () => {

    const [value, setValue] = useState('0');
    const [storedValue, setStoredValue] = useState('');
    const [operator, setOperator] = useState('');
    const [reset, setReset] = useState(false);


    const handleNumberClick = (digit) => {
        if (reset) {
        setValue(digit);
        setReset(false);
        
        if (operator === '=') {
            setStoredValue('');
            setOperator('');
        }
    } else {
        if (value.endsWith('.00')) return;

        setValue((prev) => (prev === '0' ? digit : prev + digit));
        }
    };

    const handleClear = () => {
        setValue('0');
    };

    const handleOperator = (button) => {

        if (operator === '=') {
            setStoredValue(value);
            setOperator(button);
            setReset(true);
            return;
        }
        if (operator && storedValue && !reset) {
            let num1 = parseFloat(storedValue);
            let num2 = parseFloat(value);
            let total = 0;

            switch(operator) {
            case "*": total = num1 * num2; break;
            case "/": total = num2 !== 0 ? num1 / num2 : 'Error'; break;
            case "+": total = num1 + num2; break;
            case "-": total = num1 - num2; break;
            default: return;
        }
       if (total === 'Error') {
            setValue('Error');
            setStoredValue('');
            setOperator('');
            setReset(true);
            return;
        } else {
            total = Number(total.toFixed(4));
            setValue(String(total));
            setStoredValue(String(total)); // Store the intermediate total (e.g., 64)
    }
        } else {
            // If it's just the first operator (e.g., typing the very first 8 *), just store the value
            setStoredValue(value);
        }

        setOperator(button);
        setReset(true);
        
    }

    const handleAllClear = () => {
        setValue('0');
        setStoredValue('');
        setOperator('');
        setReset(false);
    };

    const handleDecimal = () => {
        if (reset) {
            setValue('0.');
            setReset(false)
            if (operator === '=') {
                setStoredValue('');
                setOperator('');
            }
        return;

        }
        if (value.endsWith('.00')) return;
        
        if (!value.includes('.')) {
            setValue((prev) => prev + '.');
        }
    };

    const handleDoubleZero = () => {
        if (reset) {
            setValue('0');
            setReset(false);

            if (operator === '=' ) {
                setStoredValue('');
                setOperator('');
            }
            return;
        }
        if (value.endsWith('.00')) return;

        if (!value.includes('.')) {
            setValue((prev) => prev + '.00');
        }
    };

    const handleBackspace = () => {
        setValue((prev) => (prev.length > 1 ? prev.slice(0,-1): '0'));
    };

    const handleCalculate = () => {

        if (operator && value && storedValue) {
            let num1 = parseFloat(storedValue);
            let num2 = parseFloat(value);
            let total = 0;
            
            switch(operator){
                case "*":
                    total = num1 * num2; 
                    break;
                case "/": 
                    total = num2 !== 0 ? num1 / num2 : 'Error'; 
                    break;
                case "+": 
                    total = num1 + num2; 
                    break;
                case "-": 
                    total = num1 - num2;
                    break;
                default:
                    return;
            }

            if (total === 'Error') {
                setValue('Error');
                setStoredValue('');
                setOperator('');
            } else if (typeof total === 'number' && !isNaN(total)) {
                total = Number(total.toFixed(4));

                setStoredValue((prev) => prev + ' ' + operator + ' ' + value); 
                setOperator('='); // Set operator to '=' to finish the sentence
                setValue(String(total));  
            }           
            setReset(true);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            //save which key is down as key
            const { key } = event;
            // if event is repeating, meaning button held down, and it isnt the backspace button, dont.
            if (event.repeat && key !== 'Backspace') {
                return;
            }

            //switch for what to do with each button press. 0-9, operators, decimal, clear (2x),backspace, calculate
            switch(key) {
                case '0':
            }
            
        }
    })
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
                <button onClick={handleDoubleZero}>00</button>
                <button onClick={handleDecimal}>.</button>
                <button onClick={handleCalculate}>=</button>
            </div>
        </div>
    </div>
    
  )
}

export default Calculator;
