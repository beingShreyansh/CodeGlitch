import React, { useState } from 'react';
import './styles/OutputDisplay.css';

const OutputDisplay = ({ output, input }) => {
  const [inputs, setInput] = useState('');

  return (
    <div className="output-container">
      <pre className="output-content">{output}</pre>
    </div>
  );
};

export default OutputDisplay;
