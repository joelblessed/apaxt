import React, { useEffect, useState, useRef } from "react";
import Box from "./boxes"
import { useNavigate, useParams, Link } from "react-router-dom";

const CategoryPage = ({
  api,
  SelectedProduct,
  highlightText,
  filteredProducts
  
}) => {

  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();
  const navigate = useNavigate();
  

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

 
  // Fetch all products
  const filteredCategory = data.filter(
    (product) => product.category === categoryName
  );

  

  return (
    <div>
      <div>
        <Box
          Mobject={products}
          Dobject={products}
          handleProductClick={handleProductClick}
          SelectedProduct={SelectedProduct}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
