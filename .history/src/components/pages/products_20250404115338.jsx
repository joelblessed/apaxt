import React, { createContext, useEffect, useState } from "react";


import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import Box from "./boxes";

const Products = ({
  filteredProducts,
  SelectedProduct,
  highlightText,
  api,

 
}) => {

  const navigate = useNavigate();
  const [products,setProducts] =useState([])
  
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  
  // // Fetch all products
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch(`${api}/products`);
  //     const data = await response.json();
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, [api]);

  return (
    <div>
      <div>
        <Box
          Mobject={products}
          Dobject={products}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
         
          
        />
      </div>
    </div>
  );
};

export default Products;
