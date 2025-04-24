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

import Box from "./boxes";

const Products = ({
  
  filteredProducts,
  SelectedProduct,
 
  highlightText,
 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(null);
 

  const [selected, setSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  
  const username = localStorage.getItem("username");
  const previewRef = useRef(null);
 

  const dispatch = useDispatch(); // Function to check screen size

  



  const navigate = useNavigate();
  
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };
  

 

  return (
    <div>
      <div>
        <Box
          Mobject={filteredProducts}
          Dobject={filteredProducts}
          // show={show}
          handleProductClick={handleProductClick}
          SelectedProduct={SelectedProduct}
          isMobile={isMobile}
          // showDetails={showDetails}
         
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default Products;
