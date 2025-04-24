import React from 'react';
import './Test.css'; // Import your CSS file

const Test = ({  filteredProducts}) => {
  const boxes = [1, 2, 3, 4, 5]; // Example array

  return (
    <div className="box-container">
      {  filteredProducts.map((box, index) => (
        <div
          key={index}
          className={`box ${index ===   filteredProducts.length - 1 ? 'last-box' : ''}`}
        >
          {box.name}

        </div>
      ))}
    </div>
  );
};


export default Test;