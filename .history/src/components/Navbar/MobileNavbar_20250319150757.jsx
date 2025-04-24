import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Navbar = styled.nav`
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */

  @media (max-width: 768px) {
    padding: 10px;
  }
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
  flex: 1; /* Allow search container to grow */
  margin: 0 10px; /* Add margin for spacing */

  @media (max-width: 768px) {
    margin: 10px 0; /* Adjust margin for smaller screens */
    width: 100%; /* Full width on mobile */
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 5px;
  outline: none;
  width: 100%; /* Full width on mobile */
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

const ProfileImage = styled.img`
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
  top: 60px;
  left: 0;
  width: 100%;
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
}) {
  const { username, profileImage } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  
 

export default MobileNavbar;