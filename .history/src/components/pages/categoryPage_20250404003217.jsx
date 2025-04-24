import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "../translations/i18n";
import Box from "./boxes"
import { useNavigate, useParams, Link } from "react-router-dom";
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
import { addToCart, removeFromCart } from "../../cartSlice";
import e from "cors";

const CategoryPage = ({
  api,
  loading,
  add,
  images,

  SelectedProduct,
  addToCart,
  addToWishList,
  handleShowAlert,
  showAlert,
  mobilefilteredProducts,
  searchTerm,
  highlightText,
  filteredProducts,

  selectedCategory,
  Fortop,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const { categoryName } = useParams();

  const navigate = useNavigate();
  


  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

 
  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      const data = await response.json();
      const filteredCategory = data.filter(
        (product) => product.category === categoryName
      );
      // setProducts(data);
      setProducts(filteredCategory);
    };
    fetchProducts();
  }, [api]);

  

  return (
    <div>
      <div>
        <Box
          Mobject={products}
          Dobject={products}
          selectedDProduct={selectedProduct}
      
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

export default CategoryPage;
