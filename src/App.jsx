import React, { useState } from 'react';
import './App.css'; // Make sure to import your CSS file

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    try {
      // Evaluate the input expression using eval
      const evaluatedResult = eval(inputValue);
      setResult(evaluatedResult);
    } catch (error) {
      setResult('Error'); // Handle any evaluation errors
    }
  };

  return (
    <>
      <h1>Simple Calculator</h1>
      <input 
        type="text" // Change to text to allow for expressions
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={handleCalculate}>Equal</button>
      {result !== null && <h2>Result: {result}</h2>}
    </>
  );
}

export default App;