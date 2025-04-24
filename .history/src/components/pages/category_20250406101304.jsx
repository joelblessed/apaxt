import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CategoryBox from "./categoryBox";
import { debounce } from 'lodash';
import Fuse from "fuse.js";

const Category = ({
  searchTerm,
  setSearchTerm,
  api,
  glofilteredProducts,
  loaderRef,
  highlightText,
  SelectedProduct,
}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Memoize fuse instance for performance
  const fuse = useMemo(() => new Fuse(glofilteredProducts, {
    keys: ["name", "category", "owner", "brand.name"],
    threshold: 0.3,
  }), [glofilteredProducts]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${api}/products?page=${page}&limit=4`);
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

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  // Handle search functionality
  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      const results = fuse.search(searchTerm.trim());
      const matched = results.map(res => res.item);
      setProducts(matched);
      setHasMore(false);
    } else {
      setHasMore(true);
      // Reset to initial state or fetch first page again
      setPage(1);
      setProducts([]);
      fetchProducts();
    }
  }, [searchTerm, fuse]);

  const handleProductClick = useCallback((product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/selectedProduct");
  }, [SelectedProduct, navigate]);

  const groupByCategory = useCallback((products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  }, []);

  const groupedProducts = useMemo(() => groupByCategory(products), [products, groupByCategory]);

  const Dobject = useMemo(() => Object.keys(groupedProducts), [groupedProducts]);
  const Dobject1 = useMemo(() => {
    return Dobject.reduce((acc, category) => {
      acc[category] = groupedProducts[category].slice(0, 5);
      return acc;
    }, {});
  }, [Dobject, groupedProducts]);

  return (
    <div>
      <CategoryBox
        Mobject={products}
        Dobject={Dobject}
        Dobject1={Dobject1}
        loaderRef={loaderRef}
        SelectedProduct={SelectedProduct}
        handleProductClick={handleProductClick}
        highlightText={highlightText}
      />
    </div>
  );
};

export default Category;