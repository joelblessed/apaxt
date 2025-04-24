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
  const [category,setCategry] = useState(categoryName||"All")

  // // Memoized fuse instance for search
  // const fuse = useMemo(() => new Fuse(glofilteredProducts, {
  //   keys: ["name", "category", "owner", "brand.name"],
  //   threshold: 0.3,
  // }), [glofilteredProducts]);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
  
    const res = await fetch(`${api}/products?page=${page}&limit=8`);
    const data = await res.json();
    const fetched = data.products || data;

    if (fetched.length === 0) setHasMore(false);

    // Set filtered products based on fetched data
    const uniqueProducts = (prev, newItems) => {
      const ids = new Set(prev.map((p) => p.id));
      return [...prev, ...newItems.filter((item) => !ids.has(item.id))];
    };

    const mobilefilteredProducts =
    category === category
      ? products
      : products.filter((product) => product.category === category);
    
   
    setProducts((prev) => uniqueProducts(prev, fetched));
  
  }, [ ]);



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
  }, [hasMore]);



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

  // Initial fetch and reset when category changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [category]);


  // // Search functionality
  // useEffect(() => {
  //   if (searchTerm && searchTerm.trim() !== "") {
  //     const results = fuse.search(searchTerm.trim());
  //     const matched = results.map(res => res.item);
  //     setProducts(matched);
  //     // setHasMore(false);
  //   } else {
  //     setHasMore(true);
  //     setPage(1);
  //     setProducts([]);
  //     fetchProducts();
  //   }
  // }, [searchTerm, fuse]);

  // Mobile scroll to top on search

  useEffect(() => {
    if (searchTerm && window.innerWidth < 1000) {
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

    useEffect(() => {
      fetchProducts();
    }, [page]);


  useEffect(() => {
    if (searchTerm.trim() !== "" && searchTerm) {
      // Use fuse search if products already loaded
      const fuse = new Fuse(glofilteredProducts, {
        keys: ["name", "category", "owner", "brand.name"],
        threshold: 0.3,
      });
  
      const results = fuse.search(searchTerm.trim());
      const matched = results.map((res) => res.item);
    
      setProducts(matched);
      setHasMore(false); // Stop pagination on search
    } else {
   
      setProducts(products); // Reset to original products
      setHasMore(true); // Enable pagination again
    }
  }, [searchTerm, glofilteredProducts, products]);


 
  const fetchSearchResults = async (query) => {
    if (!query) {
      setProducts([]); // Or fetch default list
      return;
    }

    const res = await fetch(`${api}/search?query=${query}`);
    const data = await res.json();
    const fetched = data.products || data;
   
    setProducts(fetched);
  };

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    fetchSearchResults(query);
  },200); // Delay in milliseconds

  useEffect(() => {
    // Trigger the debounced search when the search term changes
    debouncedSearch(searchTerm);

    // Cleanup debounce function when the component unmounts or searchTerm changes
    return () => {
      debouncedSearch.cancel();
    };
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