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
            <a href="#"><NavLink to="/Cart2" actiiveClassName="active"><div style={{background:"",width:"40px", marginTop:"-13px"}}> <div style={{background:"",height:"12px"}}><label style={{color:"green", marginLeft:"-17px", marginTop:"3px"}}>{totalItems}</label></div> <div style={{display:"flex" ,background:"", height:"inherit"}} ><svg style={{background:""}} xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="15px" fill="#F19E39"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>Cart</div> </div></NavLink></a>
            
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? "✖" : "☰"}
            </button>
        </nav>
    );
}

export default Navbar