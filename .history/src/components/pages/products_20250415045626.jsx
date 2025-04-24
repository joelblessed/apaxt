import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [category, setCategory] = useState(categoryName || "All");
  const [isSearching, setIsSearching] = useState(false);
  
  // Fetch products with pagination
  const fetchProducts = useCallback(async (currentPage = page, currentCategory = category) => {
    try {
      const res = await fetch(`${api}/products?page=${currentPage}&limit=10&category=${currentCategory}`);
      const data = await res.json();
      const fetched = data.products || data;
  
      setHasMore(fetched.length > 0);
      
      setProducts(prev => {
        const ids = new Set(prev.map(p => p.id));
        return [...prev, ...fetched.filter(item => !ids.has(item.id))];
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setHasMore(false);
    }
  }, [page, category]);
  
  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || isSearching) return;
  
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
  }, [hasMore, isSearching]);
  
  // Reset when category changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    setIsSearching(false);
  }, [category]);
  
  // Handle product search
  const fetchSearchResults = useCallback(async (query) => {
    if (!query || query.trim() === "") {
      setIsSearching(false);
      setHasMore(true);
      setPage(1);
      setProducts([]);
      return;
    }
  
    setIsSearching(true);
    try {
      const res = await fetch(`${api}/search?query=${query});
      const data = await res.json();
      const fetched = data.products || data;
      setProducts(fetched);
      setHasMore(false);
    } catch (error) {
      console.error("Search failed:", error);
      setProducts([]);
    }
  }, []);
  
  // Debounced search
  const debouncedSearch = useMemo(() => 
    debounce((query) => {
      fetchSearchResults(query);
    }, 300)
  , [fetchSearchResults]);
  
  // Handle search term changes
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      debouncedSearch(searchTerm);
    } else {
      debouncedSearch.cancel();
      setIsSearching(false);
      setHasMore(true);
      setPage(1);
      setProducts([]);
      fetchProducts(1, category);
    }
  
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, category, debouncedSearch, fetchProducts]);
  
  // Fetch products when page or category changes
  useEffect(() => {
    if (!isSearching) {
      fetchProducts();
    }
  }, [page, category, isSearching, fetchProducts]);
  
  const handleProductClick = useCallback((product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/selectedProduct");
  }, [SelectedProduct, navigate]);
  
  // Mobile scroll to top on search
  useEffect(() => {
    if (searchTerm && window.innerWidth < 1000) {
      window.scrollTo({ top: 0, behavior: "smooth" });
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