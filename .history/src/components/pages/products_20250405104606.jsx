import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../wishlistSlice";
import {useState } from "react";
import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import Box from "./boxes";

const Products = ({
  filteredProducts,
  SelectedProduct,
  highlightText,

 
}) => {

  const navigate = useNavigate();
  const [products,setProducts] = useState(filteredProducts)
  
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
          handleProductClick={handleProductClick}
          highlightText={highlightText}
         
      />
        
      </div>
    </div>
  );
};

export default Products;
