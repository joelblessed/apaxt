import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  category,
  api,
  Search,
}) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();
  const observer = useRef(null);

  // Memoized fuse instance for search
  const fuse = useMemo(() => new Fuse(glofilteredProducts, {
    keys: ["name", "category", "owner", "brand.name"],
    threshold: 0.3,
  }), [glofilteredProducts]);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(${api}/products?page=${page}&limit=4);
      const data = await res.json();
      const fetched = data.products || data;

      setProducts(prev => {
        // Filter out duplicates
        const ids = new Set(prev.map(p => p.id));
        const newProducts = [...prev, ...fetched.filter(item => !ids.has(item.id))];
        
        // If we get fewer items than requested, we've reached the end
        if (fetched.length < 4) {
          setHasMore(false);
        }
        
        return newProducts;
      });

      setIsInitialLoad(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [page, api]);

  // Handle infinite scroll
  useEffect(() => {
    if (!hasMore || isInitialLoad) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { 
        root: null,
        rootMargin: "100px",
        threshold: 0.1
      }
    );

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loaderRef, isInitialLoad]);

  // Initial fetch and reset when category changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    setIsInitialLoad(true);
    fetchProducts();
  }, [category, fetchProducts]);

  // Search functionality
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      const results = fuse.search(searchTerm.trim());
      const matched = results.map(res => res.item);
      setProducts(matched);
      setHasMore(false);
    } else {
      // Only reset if we're not in the initial load
      if (!isInitialLoad) {
        setHasMore(true);
        setPage(1);
        setProducts([]);
        fetchProducts();
      }
    }
  }, [searchTerm, fuse, isInitialLoad, fetchProducts]);

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
        ={products}
        loaderRef={loaderRef}
        handleProductClick={handleProductClick}
        highlightText={highlightText}
        category={category}
      />
    </div>
  );
};

export default Products;