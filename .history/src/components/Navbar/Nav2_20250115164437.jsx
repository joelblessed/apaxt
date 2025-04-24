import { useState } from "react";
import "./Nav.css";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Logo</h1>
            </div>

            <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                
            <div className='Desk-search'>
        <input className='Desk-searchbar' 
        placeholder="search"
        type="text"
        value={searchTerm}
        defaultValue=""
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      
  
        </div>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? "✖" : "☰"}
            </button>
        </nav>
    );
}

export default Navbar