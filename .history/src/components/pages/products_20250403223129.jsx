import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import {
  BoxContainer,
  AddtocartButton,
  MAddtocartButton,
  MAddToWishList,
  Price,
  Discount,
  DescriptionContainer,
  DescriptionTitle,
  DescriptionContent,
  StatusContainer,
  StatusContent,
  StatusTitle,
  CloseButton,
  Name,
  positions,
  iospositions,
  fontSizes,
  iosfontSizes,
  categoryShadow,
} from "./styledComponents";
import { addToCart, removeFromCart } from "../../cartSlice";
import Box from "./boxes";

const Products = ({
  api,
  loading,
  add,
  images,
  filteredProducts,
  SelectedProduct,
  addToCart,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
  selectedCategory,
  Fortop,
  addToWishlist,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [selected, setSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  
  const username = localStorage.getItem("username");
  const previewRef = useRef(null);
  const { t, i18n } = useTranslation();
  const buttonRef = useRef(null);
  const position = positions[i18n.language] || position.en;
  const fontSize = fontSizes[i18n.language] || fontSize.en;
  const Iposition = iospositions[i18n.language] || position.en;
  const IfontSize = iosfontSizes[i18n.language] || fontSize.en;

  const dispatch = useDispatch(); // Function to check screen size

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, [api]);




  const navigate = useNavigate();
  
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };
  // ////////////////////////////////////////////////////////

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  // ///////////////////////////////////////////////////////////

  

 

  return (
    <div>
      <div>
        <Box
          Mobject={filteredProducts}
          Dobject={filteredProducts}
          show={show}
          handleProductClick={handleProductClick}
          SelectedProduct={SelectedProduct}
          isMobile={isMobile}
          // showDetails={showDetails}
          position={position}
          Iposition={Iposition}
          fontSize={fontSize}
          IfontSize={IfontSize}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default Products;
