import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../wishlistSlice";
import React, { useEffect, useState, useRef, useCallback } from "react";

import { useTranslation } from "react-i18next";
import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import { debounce } from 'lodash';
import Fuse from "fuse.js";
import Box from "./boxes";

const Products = ({
  glofilteredProducts,
  SelectedProduct,
  highlightText,
  loaderRef,
  searchTerm,
  setSearchTerm,
  category,
  api,
  Search,
  products,
  filteredProducts,
}) => {

  const [mproducts, setMProducts] = useState([]);

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


 
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };
 

  return (
    <div>
      <div>
        
        <Box
          Mobject={products}
          Dobject={filteredProducts}
       
          loaderRef={loaderRef}
          SelectedProduct={handleProductClick}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
          category={category}
        />
      </div>
    </div>
  );
};

export default Products;