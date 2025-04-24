import React, { useRef } from "react";

const HoverClick = () => {
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} style={{ padding: "20px", border: "1px solid black" }}>
      <button ref={buttonRef} onClick={() => alert("Clicked!")}>Click Me</button>
    </div>
  );
};

export default HoverClick;