import React, { useState } from 'react';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ onClick, className = '', children, ...props }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all duration-150 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        {/* Display Screen */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4 border-2 border-gray-700">
          <div className="text-right text-3xl font-mono text-green-400 min-h-[2.5rem] flex items-center justify-end overflow-hidden">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            onClick={clear}
            className="col-span-2 bg-red-600 hover:bg-red-700 text-white"
          >
            Clear
          </Button>
          <Button
            onClick={() => setDisplay(display.slice(0, -1) || '0')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            ⌫
          </Button>
          <Button
            onClick={() => performOperation('/')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputNumber(7)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber(8)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber(9)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            9
          </Button>
          <Button
            onClick={() => performOperation('*')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputNumber(4)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber(5)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber(6)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            6
          </Button>
          <Button
            onClick={() => performOperation('-')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            −
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputNumber(1)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber(2)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber(3)}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            3
          </Button>
          <Button
            onClick={() => performOperation('+')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputNumber(0)}
            className="col-span-2 bg-gray-600 hover:bg-gray-500 text-white"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gray-600 hover:bg-gray-500 text-white"
          >
            .
          </Button>
          <Button
            onClick={handleEquals}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;