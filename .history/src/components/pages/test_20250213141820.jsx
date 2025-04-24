import React from 'react';
import './BoxList.css'; // Import your CSS file

const BoxList = ({ boxes }) => {
  return (
    <div className="box-container">
      {boxes.map((box, index) => (
        <div
          key={index}
          className={box ${index === boxes.length - 1 ? 'last-box' : ''}}
        >
          {box}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const boxes = [1, 2, 3, 4, 5]; // Example array

  return (
    <div>
      <BoxList boxes={boxes} />
    </div>
  );
};

export default App;