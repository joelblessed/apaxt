import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryBox from "./categoryBox";
import { debounce } from "lodash";
import Fuse from "fuse.js";

const Category = ({
  searchTerm,
  setSearchTerm,
  api,
  loaderRef,
  highlightText,
  SelectedProduct,
}) => {
  // Consolidated state
  const [data, setData] = useState({
    products: [],
    allProducts: [],
    page: 1,
    hasMore: true,
    category: null,
  });
  
  const navigate = useNavigate();
  const { selectedCategory } = useParams();
  const [uniqueCategories, setUniqueCategories] = useState([]);

  // Memoize fuse instance for performance
  const fuse = useMemo(
    () =>
      new Fuse(data.allProducts, {
        keys: ["name", "category", "owner", "brand.name"],
        threshold: 0.3,
      }),
    [data.allProducts]
  );

  // Fetch all products once on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${api}/allProducts`);
        const { products } = await res.json();
        setData(prev => ({ ...prev, allProducts: products || [] }));
      
      } catch (error) {
        console.error("Failed to fetch all products:", error);
      }
    };
    fetchAllProducts();
  }, [api]);

  // Main data fetching logic
  const fetchProducts = useCallback(async () => {
    if (!data.hasMore) return;

    try {
      const url = searchTerm || selectedCategory 
        ? `${api}/search?query=${encodeURIComponent(searchTerm || selectedCategory)}&page=${data.page}&limit=10`
        : `${api}/products?page=${data.page}&limit=10;`

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const response = await res.json();
      const newProducts = response.products || response.results || response || [];

      setData(prev => {
        const ids = new Set(prev.products.map(p => p.id));
        const filtered = newProducts.filter(item => !ids.has(item.id));
        
        return {
          ...prev,
          products: [...prev.products, ...filtered],
          hasMore: filtered.length > 0,
        };
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setData(prev => ({ ...prev, hasMore: false }));
    }
  }, [data.page, data.hasMore, api, searchTerm, selectedCategory]);

  // Handle infinite scroll
  useEffect(() => {
    if (!loaderRef.current || !data.hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setData(prev => ({ ...prev, page: prev.page + 1 })),
      { rootMargin: "100px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, data.hasMore]);

  // Reset and fetch when search/category changes
  useEffect(() => {
    setData(prev => ({
      ...prev,
      products: [],
      page: 1,
      hasMore: true,
      category: selectedCategory || null
    }));
  }, [searchTerm, selectedCategory]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    return data.allProducts.reduce((acc, product) => {
      const mainCategory = product.category?.main;
      if (!mainCategory) return acc;
  
      if (!acc[mainCategory]) acc[mainCategory] = [];
      acc[mainCategory].push(product);
      return acc;
    }, {});
  }, [data.allProducts]);

  

  const categoryPreview = useMemo(() => {
    return Object.keys(groupedProducts).reduce((acc, category) => {
      acc[category] = groupedProducts[category].slice(0, 5);
      return acc;
    }, {});
  }, [groupedProducts]);

  const handleProductClick = useCallback((product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate("/selectedProduct");
  }, [SelectedProduct, navigate]);

  console.log("test",groupedProducts)

  return (
    <div style={{ background: "", width: "100%" }}>
      <CategoryBox
        Mobject={data.products}
        Dobject={Object.keys(groupedProducts)}
        Dobject1={categoryPreview}
        loaderRef={loaderRef}
        SelectedProduct={SelectedProduct}
        handleProductClick={handleProductClick}
        highlightText={highlightText}
      />
    </div>
  );
};

export default Category;