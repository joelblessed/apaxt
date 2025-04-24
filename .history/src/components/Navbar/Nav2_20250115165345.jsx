import { useState } from "react";
import "./Nav.css";
import { Link, NavLink } from 'react-router-dom'

function Navbar({cart, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory}) {
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

                <a href="#"> <NavLink to="/category"><select 
          defaultValue="All"
          style={{width:"59px", border:"0px", background:"none"}}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          >
              <option value="All">Category</option>
              <option value="phone">Phones</option>
              <option value="computer">Computers</option>
              <option value="accesseries">Accesseries</option>
              <option value="farm">Farm</option>
              <option value="others">Others</option>
            
            </select></NavLink> </a>
              
            <a><NavLink to="/newProduct" actiiveClassName="active">Sell</NavLink></a>
            
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? "✖" : "☰"}
            </button>
        </nav>
    );
}

export default Navbar