import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Test = () => {
  // To store whether an element is in view or not
  const [isVisible, setIsVisible] = useState(false);

  // UseRef for the element we want to track
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Check if element is in viewport
      },
      { threshold: 0.5 } // Trigger the callback when 50% of the element is in the viewport
    );

    if (elementRef.current) {
      observer.observe(elementRef.current); // Start observing the element
    }

    // Cleanup the observer when component unmounts
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1>Scroll down to see the effect</h1>
      </div>

      <div
        ref={elementRef}
        className={`fade-box ${isVisible ? "visible" : "hidden"}`}
      >
        <h2>This box fades in and out on scroll</h2>
      </div>

      <div className="content">
        <h1>Keep scrolling...</h1>
      </div>

      <div className="content">
        <h1>More content to scroll!</h1>
      </div>

      <div
        className={`fade-box ${isVisible ? "visible" : "hidden"}`}
      >
        <h2>This box fades in and out on scroll</h2>
      </div>
    </div>
  );
};

export default Test;