import React, { useState } from 'react';

const Test = () => {
  // Create a state variable to determine if the content should be shown
  const [isVisible, setIsVisible] = useState(false);

  // Toggle the visibility when the button is pressed
  const handleButtonClick = () => {
    setIsVisible(true); // Set to true to show the content
    // If you want to toggle it on and off, use:
    // setIsVisible(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {isVisible ? 'Hide Content' : 'Show Content'}
      </button>

      {/* Conditionally render the content based on isVisible */}
      {isVisible && (
        <div>
          <h2>This content is now visible!</h2>
          <p>You pressed the button to reveal me.</p>
        </div>
      )}
    </div>
  );
};

export default Test;