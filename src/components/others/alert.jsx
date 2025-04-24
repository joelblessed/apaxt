import React, { useState } from "react";

const Alert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
  };

  return (
    <div>
      <button onClick={handleShowAlert}>Show Custom Alert</button>
      {showAlert && (
        <div style={{ padding: "10px", backgroundColor: "red", color: "white" }}>
          This is a custom alert!
        </div>
      )}
    </div>
  );
};

export default Alert