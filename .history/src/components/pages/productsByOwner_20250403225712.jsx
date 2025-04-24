import React, { useEffect, useState, useRef } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";
import Box from './boxes'




const ProductsByOwner = ({
  api,
 
  SelectedProduct,
 
  highlightText,
  
}) => {

  const [products, setProducts] = useState([]);
 

  
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
            
             highlightText={highlightText}
           />
         </div>
       </div>
  );
};

export default ProductsByOwner;
