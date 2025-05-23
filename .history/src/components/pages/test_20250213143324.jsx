import React from 'react';
import './Test.css'; // Import your CSS file

const Test = ({  filteredProducts}) => {


  return (
    <div className="boxty-container">
      {  filteredProducts.map((box, index) => (
        <div
          key={index}
          className={`box ${index ===   filteredProducts.length - 1 ? 'last-box' : ''}`}
        >
          {box.name}
          csfgr

        </div>
      ))}
    </div>
  );
};


export default Test;