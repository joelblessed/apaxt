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
 
  positions,
  fontSizes,
  iospositions,
  iosfontSizes,
  categoryShadow,
} from "./styledComponents";
import { addToCart, removeFromCart } from "../../cartSlice";
import Box from "./boxes";

const Discounts = ({
  
  SelectedProduct,
  
  discounts,
  highlightText,
  selectedCategory,
  Fortop,
}) => {




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
          Mobject={discounts}
          Dobject={discounts}
          selectedDProduct={selectedProduct}
          toggleLike={toggleLike}
          show={show}
          handleProductClick={handleProductClick}
          hanldleProductHid={handleProductHid}
          isMobile={isMobile}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          showDetails={showDetails}
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

export default Discounts;
