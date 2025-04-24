import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useNavigate, useParams, Link } from "react-router-dom";
import Box from './boxes'
import { addToCart, removeFromCart } from "../../cartSlice";
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
  fontSizes,
  categoryShadow,
} from "./styledComponents";


const ProductsByOwner = ({
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
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDProduct, setDSelectedProduct] = useState(null);
  const [selected, setSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showDetails, setShowDetails] = useState(true);
  const username = localStorage.getItem("username");
  const previewRef = useRef(null);
  const { ownerName } = useParams();

  const navigate = useNavigate();

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  const handleProductHid = () => {
    setSelectedProduct(null);
  };
 

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      const data = await response.json();
      const filteredByOwner = data.filter(
        (product) => product.owner === ownerName
      );
      setProducts(filteredByOwner);
      // setProducts(data);
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
            //  toggleLike={toggleLike}
             show={show}
             handleProductClick={handleProductClick}
             hanldleProductHid={handleProductHid}
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

export default ProductsByOwner;
