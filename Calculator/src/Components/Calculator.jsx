import React from 'react'
import { useState } from 'react'


const Calculator = () => {

    const [value, setValue] = useState('0');
    const [storedValue, setStoredValue] = useState('');
    const [operator, setOperator] = useState('');
    const [reset, setReset] = useState(false);


    const handleNumberClick = (digit) => {
        if (reset) {
        setValue(digit);
        setStoredValue('');
        setOperator('');
        setReset(false);  
    } else {
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
        //if there is an operator, perform stored value (operator) value and set as stored value, then store operator as new operator input. if there is operator but only stored value, no current value, then do nothing.
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
            setStoredValue('');
            setOperator('');
            setReset(false)
            return;
        }
        if (!value.includes('.')) {
            setValue((prev) => prev + '.');
        }
    };

    const handleDoubleZero = () => {
        if (reset) {
            setValue('0');
            setStoredValue('');
            setOperator('');
            setReset(false);
            return;
        }
        if (value !== '0') {
            setValue((prev) => prev + '00');
        }
    };

    const handleBackspace = () => {
        setValue((prev) => (prev.length > 1 ? prev.slice(0,-1): '0'));
    };

    const handleCalculate = () => {
        //if there is an operator, value 1 and value 2, it calculates and displays total as value in calculator and clear operator and stored value. maybe it stops concatenation on to the total value?
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
