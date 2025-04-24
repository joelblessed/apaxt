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
  const [isSearchMode, setIsSearchMode] = useState(false);
  const navigate = useNavigate();
  const observer = useRef(null);

  const fuse = useMemo(() => new Fuse(glofilteredProducts, {
    keys: ["name", "category", "owner", "brand.name"],
    threshold: 0.3,
  }), [glofilteredProducts]);

  const fetchProducts = useCallback(async (currentPage) => {
    try {
      const res = await fetch(${api}/products?page=${currentPage}&limit=4);
      const data = await res.json();
      const fetched = data.products || data;

      setProducts(prev => {
        const ids = new Set(prev.map(p => p.id));
        const newProducts = [...prev, ...fetched.filter(item => !ids.has(item.id))];
        
        if (fetched.length < 4) {
          setHasMore(false);
        }
        
        return newProducts;
      });

      setIsInitialLoad(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [api]);

  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isInitialLoad && !isSearchMode) {
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
      currentObserver.observe(loaderRef.current);
    }

    observer.current = currentObserver;

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [hasMore, isInitialLoad, isSearchMode]);

  useEffect(() => {
    const resetAndFetch = async () => {
      setPage(1);
      setProducts([]);
      setHasMore(true);
      setIsInitialLoad(true);
      setIsSearchMode(false);
      await fetchProducts(1);
      setIsInitialLoad(false);
    };
    
    resetAndFetch();
  }, [category, fetchProducts]);

  useEffect(() => {
    if (page > 1 && !isInitialLoad) {
      fetchProducts(page);
    }
  }, [page, fetchProducts, isInitialLoad]);

  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      setIsSearchMode(true);
      const results = fuse.search(searchTerm.trim());
      const matched = results.map(res => res.item);
      setProducts(matched);
      setHasMore(false);
    } else {
      setIsSearchMode(false);
      if (!isInitialLoad) {
        setHasMore(true);
        setPage(1);
        setProducts([]);
        fetchProducts(1);
      }
    }
  }, [searchTerm, fuse, isInitialLoad, fetchProducts]);

  // ... rest of your component code
};

  // Fetch products when page changes
 

export default Products;