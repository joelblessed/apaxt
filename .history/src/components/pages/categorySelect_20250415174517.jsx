import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CategoryBox from "./categoryBox";
import { debounce } from "lodash";
import Fuse from "fuse.js";
import Box from "./boxes";

const Category = ({
  searchTerm,
  setSearchTerm,
  api,
  allProducts,
  glofilteredProducts,
  loaderRef,
  highlightText,
  SelectedProduct,
}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [category, setCategory] = useState("music");
  const [uniqueCategories, setUniqueCategories] = useState([]);
   
  

  // Memoize fuse instance for performance
  const fuse = useMemo(
    () =>
      new Fuse(glofilteredProducts, {
        keys: ["name", "category", "owner", "brand.name"],
        threshold: 0.3,
      }),
    [glofilteredProducts]
  );

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${api}/products?page=${page}&limit=10`);
      const data = await res.json();
      const fetched = data.products || data;

      if (fetched.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        return [...prev, ...fetched.filter((item) => !ids.has(item.id))];
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
          setPage((prev) => prev + 1);
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
    if ( casearchTerm && searchTerm.trim() !== "") {
      const results = fuse.search(searchTerm.trim());
      const matched = results.map((res) => res.item);
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

  const handleProductClick = useCallback(
    (product) => {
      SelectedProduct(product);
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      navigate("/selectedProduct");
    },
    [SelectedProduct, navigate]
  );

  const groupByCategory = useCallback((products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  }, []);

  const groupedProducts = useMemo(
    () => groupByCategory(allProducts),
    [allProducts, groupByCategory]
  );

  const Dobject = useMemo(
    () => Object.keys(groupedProducts),
    [groupedProducts]
  );
  const Dobject1 = useMemo(() => {
    return Dobject.reduce((acc, category) => {
      acc[category] = groupedProducts[category].slice(0, 5);
      return acc;
    }, {});
  }, [Dobject, groupedProducts]);

  const fetchSearchResults = useCallback(
    async (query) => {
      try {
        const res = await fetch(
          `${api}/search?query=${encodeURIComponent(
            query
          )}&page=${page}&limit=5`
        );
        const data = await res.json();
        const fetched = data.results || [];

        if (fetched.length === 0) setHasMore(false);

        const uniqueProducts = (prev, newItems) => {
          const ids = new Set(prev.map((p) => p.id));
          return [...prev, ...newItems.filter((item) => !ids.has(item.id))];
        };

        const filteredProducts = category
        ? fetched.filter(
            (product) =>
             product.category === category
          )
        : fetched;

      setProducts((prev) => uniqueProducts(prev, filteredProducts));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    [page, category, api]
  );

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    fetchSearchResults(query);
  }, 200); // Delay in milliseconds

  useEffect(() => {
    // Trigger the debounced search when the search term changes
    debouncedSearch(searchTerm || category);

    // Cleanup debounce function when the component unmounts or searchTerm changes
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, category]);

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


  console.log(category)
  // Initial fetch and reset when category changes
  useEffect(() => {
    // setPage(1);
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

  return (
    <div>
      {searchTerm.length > 0 || category !== "" ? (
        <div>
          <Box
            Mobject={products}
            Dobject={products}
            loaderRef={loaderRef}
            SelectedProduct={SelectedProduct}
            handleProductClick={handleProductClick}
            highlightText={highlightText}
          />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Category;
