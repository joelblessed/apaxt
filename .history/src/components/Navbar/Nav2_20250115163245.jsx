import { useState } from "react";
import "./Nav.css";
import { Link, NavLink } from 'react-router-dom'

function Nav({cart, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const totalItems = cart.reduce((total, item) => total + item.forCount, 0);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Logo</h1>
            </div>

            <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? "✖" : "☰"}
            </button>
        </nav>
    );
}

export default Nav