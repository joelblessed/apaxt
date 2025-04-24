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
  const navigate = useNavigate();

  // Memoized fuse instance for search
  const fuse = useMemo(() => new Fuse(glofilteredProducts, {
    keys: ["name", "category", "owner", "brand.name"],
    threshold: 0.3,
  }), [glofilteredProducts]);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${api}/products?page=${page}&limit=2`);
      const data = await res.json();
      const fetched = data.products || data;

      if (fetched.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts(prev => {
        const ids = new Set(prev.map(p => p.id));
        return [...prev, ...fetched.filter(item => !ids.has(item.id))];
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [page, api]);

  // Handle infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: "100px" }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loaderRef]);

  // Initial fetch and reset when category changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [category]);

  // Search functionality
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      const results = fuse.search(searchTerm.trim());
      const matched = results.map(res => res.item);
      setProducts(matched);
      setHasMore(false);
    } else {
      setHasMore(true);
      setPage(1);
      setProducts([]);
      fetchProducts();
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