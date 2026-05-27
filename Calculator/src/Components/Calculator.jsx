import React from 'react'
import { useState, useEffect } from 'react'


const Calculator = () => {
    const [value, setValue] = useState('0');
    const [storedValue, setStoredValue] = useState('');
    const [operator, setOperator] = useState('');
    const [reset, setReset] = useState(false);

    const formatWithCommas = (str) => {
    if (!str || str === 'Error') return str;
    
    // Split into integer and decimal parts so typing a decimal doesn't break
    const [integerPart, decimalPart] = str.split('.');
    
    // Format the integer part with commas
    const formattedInteger = Number(integerPart).toLocaleString('en-US');
    
    // Recombine with the decimal part if it exists
    if (str.includes('.')) {
      return `${formattedInteger}.${decimalPart}`;
    }
    
    return formattedInteger;
  };

    const handleNumberClick = (digit) => {
        if (reset || value === 'Error') {
            setValue(digit);
            setReset(false);
            
            // if storedValue contains an old text sentence (like "10 + 5"), clear it out 
            if (storedValue.includes(' ')) {
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
        setValue((prev) => {
            // If it ends in .00, slice off the last 3 characters completely
            if (prev.endsWith('.00')) {
            return prev.slice(0, -3);
            }
            
            return prev.length > 1 ? prev.slice(0, -1) : '0';
        });
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
                case '0': case '1':
                case '2': case '3': 
                case '4': case '5': 
                case '6': case '7': 
                case '8': case '9':
                    event.preventDefault();
                    handleNumberClick(key);
                    break;

                case '+': case '-': case '*': case '/':
                    event.preventDefault();
                    handleOperator(key);
                    break;

                case 'Enter':
                    event.preventDefault();
                    handleCalculate();
                    break;

                case '.':
                    event.preventDefault();
                    handleDecimal();
                    break;
                
                case 'Backspace':
                    event.preventDefault();
                    handleBackspace();
                    break;  
                    
                case 'Escape':
                case 'Delete':
                    event.preventDefault();
                    handleAllClear();
                    break;

                default:
                    break;
            }            
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [value, storedValue, operator, reset]);
  return (
    <div>
        <div id="calculator-container">
            <div id="header">
                <h1>Calculator</h1>
            </div>
            <div id='screen'>
                <p id='stored-value'>
                    {storedValue.split(' ')
                    .map(chunk => (isNaN(chunk) || chunk === '') ? 
                    chunk : formatWithCommas(chunk)).join(' ')} {operator !== '=' ? operator : ''}
                </p>
                <p id='curr-value'>{formatWithCommas(value)}</p>
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
