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

  const observerRef = useRef(null);

  // Memoized fuse instance
  const fuse = useMemo(() => new Fuse(glofilteredProducts, {
    keys: ["name", "category", "owner", "brand.name"],
    threshold: 0.3,
  }), [glofilteredProducts]);

  // Fetch products with pagination - improved version
  const fetchProducts = useCallback(async (pageNum = page, shouldAppend = true) => {
    if (isSearching) return;

    try {
      const res = await fetch(${api}/products?page=${pageNum}&limit=10&category=${category});
      const data = await res.json();
      const fetched = data.products || data;

      setHasMore(fetched.length >= 10); // Assuming 10 is your page size
      
      setProducts(prev => {
        if (!shouldAppend) return fetched;
        
        const ids = new Set(prev.map(p => p.id));
        return [...prev, ...fetched.filter(item => !ids.has(item.id))];
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setHasMore(false);
    }
  }, [page, category, api, isSearching]);

  // Improved infinite scroll handler
  useEffect(() => {
    if (!loaderRef.current || !hasMore || isSearching) return;

    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1
    };

    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setPage(prev => prev + 1);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    observerRef.current.observe(loaderRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isSearching]);

  // Reset and fetch when category changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    setIsSearching(false);
    fetchProducts(1, false);
  }, [category]);

  // Fetch products when page changes
  useEffect(() => {
    if (page > 1 && !isSearching) {
      fetchProducts();
    }
  }, [page]);

  // Improved search handling
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setIsSearching(false);
      setHasMore(true);
      setPage(1);
      fetchProducts(1, false);
      return;
    }

    setIsSearching(true);
    
    // Use client-side search if we have all data
    if (products.length === glofilteredProducts.length) {
      const results = fuse.search(searchTerm.trim());
      setProducts(results.map(res => res.item));
    } else {
      // Server-side search
      const timer = setTimeout(() => {
        fetchSearchResults(searchTerm);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);



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