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
import "../translations/i18n";
import Box from './boxes'
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

const BrandPage = ({
  api,
  SelectedProduct,

  highlightText,

}) => {

  const [products, setProducts] = useState([]);
 
  const { brandName } = useParams();

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
      const filteredBrands = data.filter((product) =>
        product.brand.some((brand) => brand.name === brandName)
      );
      // setProducts(data);
      setProducts(filteredBrands);
    };
    fetchProducts();
  }, [api]);

 

  return (
    <div>
          <div>
            <Box
              Mobject={products}
              Dobject={products}
              SelectedProduct={SelectedProduct}
              
              handleProductClick={handleProductClick}
      
              highlightText={highlightText}
            />
          </div>
        </div>
  );
};

export default BrandPage;
