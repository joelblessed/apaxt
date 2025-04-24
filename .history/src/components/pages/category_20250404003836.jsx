import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import styled, { keyframes } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import CategoryBox from "./categoryBox";
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
} from "./styledComponents";

const Category = ({
  filteredProducts,
  mobilefilteredProducts,
  api,
  searchTerm,
  highlightText,
  SelectedProduct,
  addToWishList,
  addToCart,
  categoryName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDProduct, setDSelectedProduct] = useState(null);
  const [selected, setSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showDetails, setShowDetails] = useState(true);
  const username = localStorage.getItem("username");
  const previewRef = useRef(null);
  const buttonRef = useRef(null);
  const { t, i18n } = useTranslation();
  const position = positions[i18n.language] || position.en;
  const fontSize = fontSizes[i18n.language] || fontSize.en;
  const navigate = useNavigate();
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

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  const groupByCategory = (filteredProducts) => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(filteredProducts);
  // const  Dobject = Object.keys(groupedProducts).map((category) =>groupedProducts[category].slice(0,5)).flat()
  const Dobject = Object.keys(groupedProducts);
  const Dobject1 = Dobject.reduce((acc, category) => {
    acc[category] = groupedProducts[category].slice(0, 5);
    return acc;
  },{});
  return (
    <div>
      <div>
        <CategoryBox
          Mobject={mobilefilteredProducts}
          Dobject={Dobject}
          Dobject1={Dobject1}
          selectedDProduct={selectedProduct}
          toggleLike={toggleLike}
          show={show}
          handleProductClick={handleProductClick}
          handleProductHid={handleProductHid}
          isMobile={isMobile}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          showDetails={showDetails}
          position={position}
          fontSize={fontSize}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default Category;
