import React from 'react';
import './Test.css'; // Import your CSS file

const Test = ({  filteredProducts}) => {


  return (
    <div style={{display:"flex",flexDirection}}>
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