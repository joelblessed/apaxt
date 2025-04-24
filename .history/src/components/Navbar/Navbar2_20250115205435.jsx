import React, { useState } from "react";
import "./Navbar2.css";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="desktop-links">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="mobile-navbar">
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? "✖" : "☰"}
                </button>
                {isMenuOpen && (
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Contact</li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;