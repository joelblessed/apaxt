import React, { useEffect, useRef } from "react";

const HoverClick = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleHover = () => {
      if (buttonRef.current) {
        buttonRef.current.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    };

    const div = document.getElementById("hover-area");
    if (div) {
      div.addEventListener("mouseenter", handleHover);
    }

    return () => {
      if (div) {
        div.removeEventListener("mouseenter", handleHover);
      }
    };
  }, []);

  return (
    <div id="hover-area" style={{ padding: "20px", border: "1px solid black" }}>
      <button ref={buttonRef} onClick={() => alert("Clicked!")}>Click Me</button>
    </div>
  );
};

export default HoverClick;