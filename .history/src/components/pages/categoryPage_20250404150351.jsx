import React, { useEffect, useState, useRef } from "react";
import Box from "./boxes"
import { useNavigate, useParams, Link } from "react-router-dom";

const CategoryPage = ({
  api,
  SelectedProduct,
  highlightText,
  
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
          handleProductClick={handleProductClick}
          SelectedProduct={SelectedProduct}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
