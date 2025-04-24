import React from "react";
import { Link, Element, scroller } from "react-scroll";

const ScrollPage = () => {
  // Function to scroll programmatically (e.g., on button click)
  const scrollToTop = () => {
    scroller.scrollTo("top", {
      duration: 1500, // Duration of the scroll (in ms)
      delay: 100, // Delay before the scroll starts (in ms)
      smooth: "easeInOutQuart", // Easing function for smooth scroll
    });
  };

  return (
    <div>
      <nav style={{ padding: "20px", background: "#f0f0f0" }}>
        {/* Links that scroll to different sections */}
        <Link to="section1" smooth={true} duration={1000}>
          Go to Section 1
        </Link>
        {" | "}
        <Link to="section2" smooth={true} duration={1000}>
          Go to Section 2
        </Link>
        {" | "}
        <button onClick={scrollToTop}>Scroll to Top</button>
      </nav>

      <div style={{ height: "100vh", backgroundColor: "#ccc" }}>
        {/* Scrollable sections */}
        <Element name="section1" className="element" style={{ height: "100vh", backgroundColor: "#ff6347" }}>
          <h2 style={{ textAlign: "center", paddingTop: "50px" }}>Section 1</h2>
        </Element>
        <Element name="section2" className="element" style={{ height: "100vh", backgroundColor: "#4682b4" }}>
          <h2 style={{ textAlign: "center", paddingTop: "50px" }}>Section 2</h2>
        </Element>
      </div>
    </div>
  );
};

export default ScrollPage;