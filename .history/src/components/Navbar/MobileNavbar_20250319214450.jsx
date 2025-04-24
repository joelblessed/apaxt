import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Styled Components
const Navbar = styled.nav`
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MenuToggle = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #f19e39;
  }

  @media (min-width: 769px) {
    display: none; /* Hide toggle button on larger screens */
  }
`;

const Logo = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: red;

  @media (max-width: 368px) {
    font-size: 30px; /* Reduce logo size on smaller screens */
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 5px;
  border-radius: 5px;
  width: 100%; /* Full width */
  margin: 10px 0; /* Add margin for spacing */

  @media (max-width: 768px) {
    margin: 10px 0; /* Adjust margin for smaller screens */
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 5px;
  outline: none;
  width: 100%; /* Full width */
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const CartIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: auto; /* Push cart icon to the right */
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -10px;
  right: -5px;
  background: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccountContainer = styled.div`

  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    margin-left: 10px; /* Add spacing on smaller screens */
  }
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  color: red;
  &:hover {
    transform: scale(1.2);
    color: #ff6600;
  
`;


const ProfileImage = styled.img ` 
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 4px; /* Add space between image and username */
`;

const MobileMenu = styled.ul`
  list-style: none;
  background: #fff;
  position: absolute;
  top: 152px;
  left: 0;
  width: 40%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  animation: slideDown 0.3s ease-in-out;

  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  li {
    padding: 10px 0;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    &:hover {
      color: #f19e39;
    }
  }

  @media (min-width: 769px) {
    display: none; /* Hide mobile menu on larger screens */
  }
`;

const style = {
  NavLink: {
    color: "red",
    fontSize: "20px",
  },
  select: {
    width: "20%",
    color: "red",
    background: "none",
    border: "none",
    fontWeight: "bold",
    fontSize: "20px",
  },
  option: {
    background: "red",
  },
};

function MobileNavbar({
  cartCount,
  searchTerm,
  setSearchTerm,
  search,
  categories,
  changeLanguage
}) {
  const { username, profileImage } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
   const { t } = useTranslation();
   const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state

   // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
   // Handle category selection
   const handleCategorySelect = (category) => {
    setSearchTerm(category); // Update the selected category
    searchTerm = category;
    setIsOpen(false); // Close the dropdown
    // search(); // Trigger the search function
  // };



   const style = {
    select: {
      width: "200px",
      color: "red",
      background: "none",
      border: "none",
      fontWeight: "bold",
      fontSize: "20px",
      padding: "10px",
    },}
  return (
    <>
      <Navbar>
        <TopRow>
          <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✖" : "☰"}
          </MenuToggle>

          <Logo>ApaxT</Logo>

          

          <CartIconContainer>
          <NavLink>
          <LanguageButton  onClick={changeLanguage}>
      {t("Francaise")} {/* Display the toggle Button text */}
    </LanguageButton>
          </NavLink>
            <NavLink to="/Cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#F19E39"
              >
                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
              </svg>
              {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
            </NavLink>
          </CartIconContainer>

          <AccountContainer>
            <NavLink to="/dashboard">
              {imageError ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#999"
                >
                  <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Z" />
                </svg>
              ) : (
                <img
                  src={profileImage || "/public/images/svgviewer-output(1).svg"}
                  alt="loading..."
                  width="50"
                  height="50"
                  onError={() => setImageError(true)}
                  style={{ borderRadius: "50%", border: " 1px solid red" }}
                />
              )}
            </NavLink>
            <span>{username || "Account"}</span>
          </AccountContainer>
        </TopRow>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={search}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="red"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </SearchButton>
        </SearchContainer>
      </Navbar>

      <MobileMenu isOpen={isMenuOpen}>
        <li>
          <NavLink style={style.NavLink} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink style={style.NavLink} to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink style={style.NavLink} to="/category">
          <div style={{ position: "relative", display: "inline-block" }}>
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        style={{
          ...style.select,
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {searchTerm || "Category"}
        <span style={{ marginLeft: "10px" }}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            marginTop: "5px",
            padding: 0,
            listStyle: "none",
          }}
        >
          <li
            onClick={() => handleCategorySelect("")}
            style={{
              padding: "10px",
              cursor: "pointer",
              color: "#000",
              borderBottom: "1px solid #eee",
            }}
          >
            Category
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategorySelect(category)}
              style={{
                padding: "10px",
                cursor: "pointer",
                color: "#000",
                borderBottom: "1px solid #eee",
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  


// Styles

            {/* <select
              style={style.select}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option style={style.NavLink} value="">
                Category
              </option>
              {categories.map((category, index) => (
                <option
                  style={style.NavLink}
                  onClick={search}
                  key={index}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select> */}
          </NavLink>
        </li>
        <li>
          <NavLink style={style.NavLink} to="/newProduct">
            Sell
          </NavLink>
        </li>
       
      </MobileMenu>
    </>
  );
}

export default MobileNavbar;