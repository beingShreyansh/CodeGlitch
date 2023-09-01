import React from 'react';
import './styles/OutputDisplay.css';

const OutputDisplay = ({ output }) => {
  return (
    <div className="output-container">
      <pre className="output-content">{output}</pre>
    </div>
  );
};

export default OutputDisplay;
