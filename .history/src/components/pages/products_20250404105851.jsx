import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import styled, { keyframes } from "styled-components";

import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import { useTranslation } from "react-i18next";
import SelectedProductDesktop from "./selectedProductsDesktop";
import { addToWishlist } from "../../wishlistSlice";
import MobileCard from "./ProductCards/MobileCard";
import DesktopCards from "./ProductCards/desktopCards";

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
  fontSizes,
  categoryShadow,
  iospositions,
  iosfontSizes,
} from "./styledComponents";

const Products = ({
  filteredProducts,
  SelectedProduct,
  highlightText,


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

  toggleLike,
  // show,
  handleProductClick,
  // handleProductHid,
  Mobject,
  Dobject,
  WishlistArray,
  handleWislistToggle,
  isInWishlist,
  ts,
  // isMobile,
  // setSelectedProduct,
  // selectedProduct,
  // showDetails,
  // position,
  // Iposition,
  // fontSize,
  // IfontSize,

 
}) => {

  const navigate = useNavigate();
  
  
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
    

    
      // Function to check screen size
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1000);
      };
    
      useEffect(() => {
        handleResize(); // Initial check
        window.addEventListener("resize", handleResize); // Update on resize
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      const handleProductHid = () => {
        setSelectedProduct(null);
      };
    
      const show = (event) => {
        setShowDetails((prevShow) => !prevShow);
        if (previewRef.current && !previewRef.current.contains(event.target)) {
        }
      };
    

  
  

  return (
    <>
      {isMobile ? (
        <MobileCard
          addToCartAPI={addToCartAPI}
          addToCartBeforeLogin={addToCartBeforeLogin}
          addToWishlist={addToWishlist}
          Mobject={filteredProducts||Mobject}
          handleWislistToggle={handleWislistToggle}
          isInWishlist={isInWishlist}
          handleProductClick={handleProductClick}
          show={show}
          position={position}
          Iposition={Iposition}
          userId={userId}
          highlightText={highlightText}
          searchTerm={searchTerm}
          fontSize={fontSize}
          IfontSize={IfontSize}
          showDetails={showDetails}
          maxLength={maxLength}
          isExpanded={isExpanded}
          WishlistArray={WishlistArray}
        />
      ) : (
        <DesktopCards
          addToCartAPI={addToCartAPI}
          addToCartBeforeLogin={addToCartBeforeLogin}
          addToWishlist={addToWishlist}
          Dobject={Dobject}
          ts={ts}
          show={show}
          position={position}
          Iposition={Iposition}
          userId={userId}
          highlightText={highlightText}
          searchTerm={searchTerm}
          fontSize={fontSize}
          IfontSize={IfontSize}
          showDetails={showDetails}
          selectedProduct={selectedProduct}
          handleProductHid={handleProductHid}
          setSelectedProduct={setSelectedProduct}
          isExpanded={isExpanded}
          toggleLike={toggleLike}
          SelectedProductDesktop={SelectedProductDesktop}
          maxLength={maxLength}
          WishlistArray={WishlistArray}
        />
      )}
    </>
  );
};

export default Products;
