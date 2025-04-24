import React from "react";
import "./AnimatedBox.css";

function AnimatedBox() {
    return (
        <div className="animated-box">
            <div className="box-edge top"></div>
            <div className="box-edge right"></div>
            <div className="box-edge bottom"></div>
            <div className="box-edge left"></div>
        </div>
    );
}

export default AnimatedBox