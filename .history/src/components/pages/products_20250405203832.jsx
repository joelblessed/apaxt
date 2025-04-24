import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../wishlistSlice";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import { debounce } from 'lodash';
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
  const [products, setProducts] = useState([]);
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
    setProducts((prev) => [...prev, ...fetched]);
  }, [page ]);

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
  }, [hasMore]);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      
      setFilteredProducts(products);
      return;
    }

    const normalizedTerm = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const fuse = new Fuse(glofilteredProducts, {
      keys: ["name", "category", "owner", "brand.name"],
      threshold: 0.3,
      includeScore: false,
      useExtendedSearch: true,
    });

    const results = fuse.search(normalizedTerm);
    const matched = results.map((res) => res.item);
    setFilteredProducts(matched);
  }, [searchTerm, products]);

  const fetchSearchResults = async (query) => {
    if (!query) {
      setFilteredProducts([]); // Or fetch default list
      return;
    }

    const res = await fetch(`${api}/search?query=${query}`);
    const data = await res.json();
    setFilteredProducts(data);
  };

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    fetchSearchResults(query);
  }, 500); // Delay in milliseconds

  useEffect(() => {
    // Trigger the debounced search when the search term changes
    debouncedSearch(searchTerm);

    // Cleanup debounce function when the component unmounts or searchTerm changes
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);


  // useEffect(() => {
  //   const query = searchTerm.trim().toLowerCase();

  //   let filtered = filteredProducts.filter((product) => {
  //     const categoryMatch = product.category.toLowerCase().includes(query);
  //     const productNameMatch = product.name.toLowerCase().includes(query);
  //     const ownerNameMatch = product.owner.toLowerCase().includes(query);
  //     const brandMatch = product.brand.some((b) =>
  //       b.name.toLowerCase().includes(query)
  //     );

  //     return categoryMatch || productNameMatch || brandMatch || ownerNameMatch;
  //   });

  //   // Optional: Filter by selected category
  //   // if (selectedCategory) {
  //   //   filtered = filtered.filter(
  //   //     (product) => product.category === selectedCategory
  //   //   );
  //   // }

  //   setFilteredProducts(filtered);
  //   // setSearchTerm(""); // Optional: Clear input after search
  // }, [searchTerm]);





  // //////////////////////////////////////////////////////////////////

  // mobile
  const loadMore = async () => {
    const res = await fetch(`/api/products?page=${page}&limit=10`);
    const data = await res.json();
    setProducts((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    loadMore(); // Initial fetch
  }, []);
// //////////////////////////////////////////////////////////
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
          SelectedProduct={handleProductClick}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
          category={category}
        />
      </div>
    </div>
  );
};

export default Products;
