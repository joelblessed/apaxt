import React, { useEffect, useState, useCallback, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
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
  Seller,
  addToCart,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
  selectedCategory,
  Fortop,
  loaderRef,
  loadMore,
  imagekey,
  category,
  mBoxWidth,
  mBoxMarginRight,
  toggleLike,
  // show,
  // handleProductClick,
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
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Check user login
  const maxLength = 20;
  const [showDetails, setShowDetails] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef(null);
    const navigate = useNavigate();
  

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



  const handleProductClick = useCallback(
    (product, seller ) => {
      SelectedProduct(product);
      localStorage.setItem("seller", JSON.stringify(seller));
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      navigate("/selectedProduct");

      fetch(`${api}/viewedProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.id
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Viewed product saved:", data))
        .catch((error) => console.error("Error:", error));
    },
    [SelectedProduct, navigate]
  );

  
 
  return (
    <>
      {isMobile ? (
        <>
          {Mobject.map((product, index) => (
            <MobileCard
              addToWishlist={addToWishlist}
              Mobject={product}
              index={index}
              handleWislistToggle={handleWislistToggle}
              isInWishlist={isInWishlist}
              handleProductClick={handleProductClick}
              SelectedSeller={Seller}
              show={show}
              loaderRef={loaderRef}
              category={category}
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
              imagekey={imagekey}
            />
          ))}
        </>
      ) : (
        <>
          {Dobject.map((product, index) => (
            <DesktopCards
              addToWishlist={addToWishlist}
              Dobject={product}
              index={index}
              ts={ts}
              mBoxWidth={mBoxWidth}
              mBoxMarginRight={mBoxMarginRight}
              loaderRef={loaderRef}
              category={category}
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
              imagekey={imagekey}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Box;
