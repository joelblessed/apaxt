import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash';
import Fuse from "fuse.js";
import Box from "./boxes";
import "./products.css";
import "../translations/i18n";

useEffect(() => {
  if (page > 1 && !isInitialLoad) {
    fetchProducts();
  }
}, [page, fetchProducts, isInitialLoad]);

// Mobile scroll to top on search
useEffect(() => {
  if (searchTerm && window.innerWidth < 768) {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }
}, [searchTerm]);

const handleProductClick = useCallback((product) => {
  SelectedProduct(product);
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  navigate("/selectedProduct");
}, [SelectedProduct, navigate]);

return (
  <div className="products-container">
    <Box
      Dobject={products}
      Mobject={products}
      loaderRef={loaderRef}
      handleProductClick={handleProductClick}
      highlightText={highlightText}
      category={category}
    />
  </div>
);

  // Fetch products when page changes
  useEffect(() => {
    if (page > 1 && !isInitialLoad) {
      fetchProducts();
    }
  }, [page, fetchProducts, isInitialLoad]);

  // Mobile scroll to top on search
  useEffect(() => {
    if (searchTerm && window.innerWidth < 768) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  }, [searchTerm]);

  const handleProductClick = useCallback((product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/selectedProduct");
  }, [SelectedProduct, navigate]);

  return (
    <div className="products-container">
      <Box
        Dobject={products}
        Mobject={products}
        loaderRef={loaderRef}
        handleProductClick={handleProductClick}
        highlightText={highlightText}
        category={category}
      />
    </div>
  );
};

export default Products;