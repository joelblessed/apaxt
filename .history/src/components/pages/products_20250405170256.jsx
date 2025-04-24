import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../wishlistSlice";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import Box from "./boxes";

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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    // Handle fetching new products based on page or other conditions
    // Example:
    const res = await fetch(`${api}/products?page=${page}&limit=4`);
    const data = await res.json();
    const fetched = data.products || data;

    if (fetched.length === 0) setHasMore(false);

    // Set filtered products based on fetched data
    setFilteredProducts((prev) => [...prev, ...fetched]);
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [searchTerm, hasMore]);

  useEffect(() => {
    if (!searchTerm) return setFilteredProducts(fil);

    const options = {
      keys: ["name", "category", "owner", "brand.name"],
      threshold: 0.3, // Lower = stricter match, higher = more lenient
    };

    const fuse = new Fuse(glofilteredProducts, options);
    const result = fuse.search(searchTerm);

    // Extract matched items
    const matchedProducts = result.map((res) => res.item);
    setFilteredProducts(matchedProducts);
  }, [searchTerm, glofilteredProducts]);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();

    let filtered = filteredProducts.filter((product) => {
      const categoryMatch = product.category.toLowerCase().includes(query);
      const productNameMatch = product.name.toLowerCase().includes(query);
      const ownerNameMatch = product.owner.toLowerCase().includes(query);
      const brandMatch = product.brand.some((b) =>
        b.name.toLowerCase().includes(query)
      );

      return categoryMatch || productNameMatch || brandMatch || ownerNameMatch;
    });

    // Optional: Filter by selected category
    // if (selectedCategory) {
    //   filtered = filtered.filter(
    //     (product) => product.category === selectedCategory
    //   );
    // }

    setFilteredProducts(filtered);
    // setSearchTerm(""); // Optional: Clear input after search
  }, [searchTerm]);

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  return (
    <div>
      <div>
        <Box
          Mobject={filteredProducts}
          Dobject={filteredProducts}
          loaderRef={loaderRef}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
          category={category}
        />
      </div>
    </div>
  );
};

export default Products;
