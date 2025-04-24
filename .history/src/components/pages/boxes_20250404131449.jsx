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

const Box = ({
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
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); // Function to check screen size
  const [isExpanded, setIsExpanded] = useState(false);
  const userId = localStorage.getItem("userId") || "guest"; // Check user login
  const maxLength = 20;
  const [showDetails, setShowDetails] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef(null);

  const position = positions[i18n.language] || position.en;
  const fontSize = fontSizes[i18n.language] || fontSize.en;
  const Iposition = iospositions[i18n.language] || position.en;
  const IfontSize = iosfontSizes[i18n.language] || fontSize.en;

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
        <div>
        {Dobject.map(p=>(

       
        <DesktopCards
          addToCartAPI={addToCartAPI}
          addToCartBeforeLogin={addToCartBeforeLogin}
          addToWishlist={addToWishlist}
          Dobject={p}
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
        /> ))}</div>
      )}
    </>
  );
};

export default Box;
