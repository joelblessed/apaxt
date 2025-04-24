import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Box from "./boxes";

const Discounts = ({
  
  SelectedProduct,
  discounts,
  highlightText,
  
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
          SelectedProduct={SelectedProduct}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default Discounts;
