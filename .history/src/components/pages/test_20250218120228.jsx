import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const  = () => {
  // List of elements we want to fade in
  const [boxes, setBoxes] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  // Function to generate a list of elements
  const generateBoxes = () => {
    const newBoxes = [];
    for (let i = 0; i < 8; i++) {
      newBoxes.push(i);
    }
    setBoxes(newBoxes);
  };

  useEffect(() => {
    generateBoxes(); // Create initial set of boxes
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1>Scroll down to see the fade-in effect</h1>
      </div>

      {boxes.map((box, index) => (
        <FadeInBox key={index} />
      ))}

      <div className="content">
        <h1>Keep scrolling...</h1>
      </div>

      <div className="content">
        <h1>More content to scroll!</h1>
      </div>
    </div>
  );
};

const FadeInBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={`fade-box ${isVisible ? "visible" : "hidden"}`}
    >
      <h2>This box fades in and out on scroll</h2>
    </div>
  );
};

export default 