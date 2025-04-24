import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../wishlistSlice";

import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import Box from "./boxes";
import { useEffect } from "react";

const Products = ({
  filteredProducts,
  SelectedProduct,
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
          Mobject={filteredProducts}
          Dobject={filteredProducts}
          loaderRef={loaderRef}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
         
      />
        
      </div>
    </div>
  );
};

export default Products;
