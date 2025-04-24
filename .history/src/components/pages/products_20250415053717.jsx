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

  // Memoized fuse instance for client-side search
  const fuse = useMemo(() => new Fuse(glofilteredProducts, {
    keys: ["name", "category", "owner", "brand.name"],
    threshold: 0.3,
  }), [glofilteredProducts]);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${api}/products?page=${page}&limit=10&category=${category}`);
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
  }, [page, category, api]);

  // Handle infinite scroll
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
  }, [hasMore, isSearching, loaderRef]);

  // Reset when category changes
  useEffect(() => {
    // setPage(1);?
    setProducts([]);
    setHasMore(true);
    setIsSearching(false);
  }, [category]);

  // Handle product click
  const handleProductClick = useCallback((product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/selectedProduct");
  }, [SelectedProduct, navigate]);

  // Fetch server-side search results
  const fetchSearchResults = useCallback(async (query) => {
    if (!query || query.trim() === "") {
      setIsSearching(false);
      setHasMore(true);
      // setPage(1);
      setProducts([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`${api}/search?query=${query}`);
      const data = await res.json();
      setProducts(data.products || data);
      setHasMore(false);
    } catch (error) {
      console.error("Search failed:", error);
      setProducts([]);
    }
  }, [api]);

  // Debounced search with cleanup
  const debouncedSearch = useMemo(() => 
    debounce(fetchSearchResults, 300)
  , [fetchSearchResults]);

  // Handle search term changes
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      // Use client-side search if we have all products loaded
      if (products.length === glofilteredProducts.length) {
        const results = fuse.search(searchTerm.trim());
        const matched = results.map(res => res.item);
        setProducts(matched);
        setHasMore(false);
      } else {
        debouncedSearch(searchTerm);
      }
    } else {
      debouncedSearch.cancel();
      setIsSearching(false);
      setHasMore(true);
      // setPage(1);
      setProducts([]);
      fetchProducts();
    }

    return () => debouncedSearch.cancel();
  }, [searchTerm, products.length, glofilteredProducts.length, fuse, debouncedSearch, fetchProducts]);

  // Fetch products when page changes (for infinite scroll)
  useEffect(() => {
    if (!isSearching) {
      fetchProducts();
    }
  }, [page, isSearching, fetchProducts]);

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