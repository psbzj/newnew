import React from 'react'

const Calculator = () => {
  return (
    <div className="container">
        <div id="header">
            <h1>Calculator</h1>
        </div>
        <div>
            <p id="screen">Test, will be where numbers shows up</p>
        </div>
        <div id="calculator-buttons">
            <button>7</button><button>8</button><button>9</button>
            <button>4</button><button>5</button><button>6</button>
            <button>1</button><button>2</button><button>3</button>
            <button>0</button><button>.</button><button>=</button>
        </div>
    </div>
    
  )
}

export default Calculator
