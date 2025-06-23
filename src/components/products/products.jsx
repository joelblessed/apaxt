import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import ProductStructuredData from "../support/productsStructureData";


import { useNavigate, useParams, Link } from "react-router-dom";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import Box from "../ProductCards/boxes";
import { Helmet } from "react-helmet-async";
import "./products.css";
import "../translations/i18n";


const Products = ({
  glofilteredProducts,
  SelectedProduct,
  highlightText,
  loaderRef,
  searchTerm,
  Seller,
  setSearchTerm,

  api,
  Search,
}) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [isMobile, setIsMobile] = useState();

  const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const urlQuery = searchParams.get("query") || "";



useEffect(() => {
  if (urlQuery && urlQuery !== searchTerm) {
    setSearchTerm(urlQuery);
  }
}, [urlQuery, searchTerm, setSearchTerm]);


 const OuterSearch = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Search Results for ${urlQuery}`,
    description: "Find red sneakers at ApaxT.",
    url: `https://apaxt.com/search?query=${urlQuery}`,
  };


  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    const res = await fetch(`${api}/products?page=${page}&limit=30`);
    const data = await res.json();
    const fetched = data.products || data;
    console.log(fetched);

    if (fetched.length === 0) setHasMore(false);

    // Set filtered products based on fetched data
    const uniqueProducts = (prev, newItems) => {
      const ids = new Set(prev.map((p) => p.id));
      return [...prev, ...newItems.filter((item) => !ids.has(item.id))];
    };

    const filteredProducts =
      category === "All"
        ? fetched
        : fetched.filter(
            (product) =>
              product.user_products.map((userp) => userp.category?.main) ===
              category
          );

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
      { rootMargin: "200px" } // Adjust rootMargin for earlier triggering
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
          )}&page=${currentPage}&limit=20`
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
    <div
      className="products-container"
      style={{
        background: "",
        width: isMobile ? "100%" : "90%",
        margin: "auto",
        marginBottom: "0px",
      }}
    >
  
        <Helmet>
  <title>
    {urlQuery
      ? `Search Results for "${urlQuery}" | ApaxT`
      : "Browse Products | ApaxT"}
  </title>
  <meta
    name="description"
    content={
      urlQuery
        ? `Find ${urlQuery} at ApaxT. Discover the best deals and products.`
        : "Explore our collection of products at ApaxT. Find the best deals and new arrivals."
    }
  />
  <link
    rel="canonical"
    href={`https://apaxt.com/search?query=${encodeURIComponent(urlQuery)}`}
  />
  {/* Optional: Structured data for SEO */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: urlQuery
        ? `Search Results for ${urlQuery}`
        : "Browse Products",
      description: urlQuery
        ? `Find ${urlQuery} at ApaxT. Discover the best deals and products.`
        : "Explore our collection of products at ApaxT. Find the best deals and new arrivals.",
      url: `https://apaxt.com/search?query=${encodeURIComponent(urlQuery)}`,
    })}
  </script>
</Helmet>

      {products.map((product) => {

        <div>
          <ProductStructuredData product={product} />
        </div>;
      })}
      <Box
        Mobject={products}
        Dobject={products}
        loaderRef={loaderRef}
        SelectedProduct={SelectedProduct}
        Seller={Seller}
        // handleProductClick={handleProductClick}
        highlightText={highlightText}
        category={category}
      />
      {hasMore && (
        <div ref={loaderRef} style={spinnerStyle}>
          <span style={dotStyle}></span>
          <span style={dot2Style}></span>
          <span style={dot3Style}></span>
        </div>
      )}{" "}
      {/* Loader for infinite scroll */}
    </div>
  );
};
// ...existing code...

const spinnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
};

const dotStyle = {
  width: "12px",
  height: "12px",
  margin: "0 4px",
  borderRadius: "50%",
  background: "#333",
  display: "inline-block",
  animation: "bounce 1s infinite alternate",
};

const dot2Style = { ...dotStyle, animationDelay: "0.2s" };
const dot3Style = { ...dotStyle, animationDelay: "0.4s" };

// Add this keyframes CSS to your products.css or in a <style> tag globally:
/*
@keyframes bounce {
  to {
    opacity: 0.3;
    transform: translateY(-12px);
  }
}
*/
export default Products;
