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
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const observerRef = useRef(null);

  // Memoized fuse instance for search
  const fuse = useMemo(() => new Fuse(glofilteredProducts, {
    keys: ["name", "category", "owner", "brand.name"],
    threshold: 0.3,
  }), [glofilteredProducts]);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    if (isSearching) return; // Don't fetch during search

    try {
      const res = await fetch(`${api}/products?page=${page}&limit=4`);
      const data = await res.json();
      const fetched = data.products || data;

      setProducts(prev => {
        const ids = new Set(prev.map(p => p.id));
        const newProducts = [...prev, ...fetched.filter(item => !ids.has(item.id))];
        // If we get fewer items than requested, we've reached the end
        if (fetched.length < 4) setHasMore(false);
        return newProducts;
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [page, api, isSearching]);

  // Handle infinite scroll
  useEffect(() => {
    if (!hasMore || isSearching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loaderRef, isSearching]);

  // Initial fetch and reset when category changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    setIsSearching(false);
    fetchProducts();
  }, [category]);

  // Search functionality
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      setIsSearching(true);
      const results = fuse.search(searchTerm.trim());
      const matched = results.map(res => res.item);
      setProducts(matched);
      setHasMore(false);
    } else {
      setIsSearching(false);
      setHasMore(true);
      if (products.length === 0) {
        setPage(1);
        fetchProducts();
      }
    }
  }, [searchTerm, fuse]);

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
        D={products}
        loaderRef={loaderRef}
        handleProductClick={handleProductClick}
        highlightText={highlightText}
        category={category}
      />
    </div>
  );
};

export default Products;