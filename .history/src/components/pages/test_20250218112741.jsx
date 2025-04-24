mport React, { useEffect, useState } from "react";
import "./App.css";

const ScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("scrollElement");
      const rect = element.getBoundingClientRect();
      // Trigger animation when element is in view
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-container">
      <div className="content">
        <h2>Scroll down to see the animation!</h2>
      </div>
      <div
        id="scrollElement"
        className={scroll-element ${isVisible ? "visible" : ""}}
      >
        <p>This element will fade in on scroll!</p>
      </div>
      <div className="content">
        <h2>Keep scrolling...</h2>
      </div>
    </div>
  );
};

export default ScrollAnimation;