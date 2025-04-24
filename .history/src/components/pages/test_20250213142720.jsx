import React from 'react';
import './Test.css'; // Import your CSS file

const Test = ({filteredProduct}) => {
  const boxes = [1, 2, 3, 4, 5]; // Example array

  return (
    <div className="box-container">
      {boxes.map((box, index) => (
        <div
          key={index}
          className={`box ${index === boxes.length - 1 ? 'last-box' : ''}`}
        >
          {box}
        </div>
      ))}
    </div>
  );
};


export default Test;