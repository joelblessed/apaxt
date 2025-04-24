import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link } from "react-router-dom";
import { debounce } from "lodash";
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
const productId = 2
  const [category, setCategory] = useState("All");

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    const res = await fetch(`${api}/products?page=${page}&limit=10`);
    const data = await res.json();
    const fetched = data.products || data;

    if (fetched.length === 0) setHasMore(false);

    // Set filtered products based on fetched data
    const uniqueProducts = (prev, newItems) => {
      const ids = new Set(prev.map((p) => p.id));
      return [...prev, ...newItems.filter((item) => !ids.has(item.id))];
    };

    const filteredProducts =
      category === "All"
        ? fetched
        : fetched.filter((product) => product.category === category);

    setProducts((prev) => uniqueProducts(prev, filteredProducts));
  }, [api, page, category]);

  // Handle infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "100px" }
    );

    const currentLoader = loaderRef?.current; // Add optional chaining to avoid errors
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

  // Mobile scroll to top on search
  useEffect(() => {
    if (searchTerm && window.innerWidth < 1000) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  }, [searchTerm]);

  const handleProductClick = useCallback(
    (product) => {
      SelectedProduct(product);
      ViewedProduct(product.id); // Log viewed product
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      navigate("/selectedProduct");
    },
    [SelectedProduct, navigate]
  );

const ViewedProduct = async (userId, productId) => {
  try {
    const response = await fetch(`${/viewedProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, productId })
    });

    if (!response.ok) {
      throw new Error('Failed to log viewed product');
    }

    const result = await response.json();
    console.log('Viewed product logged:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fix setProducts logic in search useEffect
  useEffect(() => {
    if (searchTerm.trim() !== "" && searchTerm) {
      const fuse = new Fuse(glofilteredProducts || [], {
        keys: ["name", "category", "owner", "brand.name"],
        threshold: 0.3,
      });

      const results = fuse.search(searchTerm.trim());
      const matched = results.map((res) => res.item);

      setProducts(matched);
      setHasMore(false); // Stop pagination on search
    } else {
      setProducts([]); // Reset to empty before fetching again
      setHasMore(true); // Enable pagination again
      setPage(1); // Reset page to 1
    }
  }, [searchTerm, glofilteredProducts]);

  const fetchSearchResults = useCallback(
    async (query, currentPage = 1) => {
      try {
        const res = await fetch(
          `${api}/search?query=${encodeURIComponent(
            query
          )}&page=${currentPage}&limit=5`
        );
        const data = await res.json();
        const fetched = data.results || [];

        if (fetched.length === 0) setHasMore(false);

        const uniqueProducts = (prev, newItems) => {
          const ids = new Set(prev.map((p) => p.id));
          return [...prev, ...newItems.filter((item) => !ids.has(item.id))];
        };

        const filteredProducts =
          category === "All"
            ? fetched
            : fetched.filter((product) => product.category === category);

        setProducts((prev) => uniqueProducts(prev, filteredProducts));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    [api, category]
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchSearchResults(query, 1); // Always start from page 1 for new searches
    }, 200),
    [fetchSearchResults]
  );

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      debouncedSearch(searchTerm);
    } else {
      setProducts([]); // Reset products when search term is cleared
      setHasMore(true); // Enable pagination again
      setPage(1); // Reset page to 1
    }

    return () => {
      debouncedSearch.cancel(); // Ensure cleanup of debounce
    };
  }, [searchTerm, debouncedSearch]);

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
