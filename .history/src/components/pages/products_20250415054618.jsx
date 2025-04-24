import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from 'lodash';
import Fuse from "fuse.js";
import Box from "./boxes";
import "./products.css";
import "../translations/i18n";

const Products = ({
  glofilteredProducts,
  SelectedProduct,
  highlightText,
  loaderRef,
  searchTerm,
  setSearchTerm,
  api,
  Search,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  
  // State management
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState(categoryName || "All");
  const [isSearching, setIsSearching] = useState(false);

 

  return (
    <div className="products-container">
      <Box
        Mobject={products}
        Dobject={products}
        loaderRef={loaderRef}
        SelectedProduct={handleProductClick}
        handleProductClick={handleProductClick}
        highlightText={highlightText}
        category={category}
      />
    </div>
  );
};

export default Products;