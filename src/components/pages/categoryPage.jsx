import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

import SearchFilter from "./searchFilter";
import "./styles.css";
import Box from "./boxes";

const CategoryPage = ({ api, SelectedProduct, searchTerm, highlightText, setSearchTerm }) => {
  // const { categoryName } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryName = params.get("categoryName");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    inStock: false,
  });

  // //viewed products
  // const handleProductClick = useCallback(
  //   (product) => {
  //     SelectedProduct(product);
  //     localStorage.setItem("selectedProduct", JSON.stringify(product));
  //     navigate("/selectedProduct");

  //     fetch(`${api}/viewedProducts`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         userId: userId,
  //         productId: product.id,
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log("Viewed product saved:", data))
  //       .catch((error) => console.error("Error:", error));
  //   },
  //   [SelectedProduct, navigate]
  // );

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = `${api}/allProducts`;
        if (categoryName) {
          url = `${api}/search?query=${encodeURIComponent(categoryName)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        const products = data.products || data.results;
        const productsArray = Array.isArray(products) ? products : [];
        setProducts(products);
        setFilteredProducts(products);
      } catch (err) {
        setError(err.message);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName, api]);

  // Search functionality
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim() === "") {
        setFilteredProducts(products);

        return;
      }

      try {
        const response = await fetch(
          `${api}/search?query=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        const products = data.products || data.results;

        setFilteredProducts(Array.isArray(products) ? products : []);
      } catch (err) {
        console.error("Search failed:", err);
        // Fallback to client-side filtering
        const filtered = Array.isArray(products)
          ? products.filter(
              (product) =>
                product?.name
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                product?.description
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
          : [];
        setFilteredProducts(filtered);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, products, api]);

  // Apply filters
  useEffect(() => {
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let result = [...products];

    // Price filter
    result = result.filter(
      (product) =>
        product?.price >= filters.priceRange[0] &&
        product?.price <= filters.priceRange[1]
    );

    // Stock filter
    if (filters.inStock) {
      result = result.filter((product) => product?.inStock);
    }

    setFilteredProducts(result);
  }, [filters, products]);

  // Safely group products by category then by brand
  

    const groupedProducts = Array.isArray(filteredProducts)
  ? filteredProducts.reduce((acc, product) => {
      const category = product.category?.main;
      const brandName = product.brand?.name;

      if (!category || !brandName) return acc;

      if (!acc[category]) acc[category] = {};
      if (!acc[category][brandName]) acc[category][brandName] = [];

      acc[category][brandName].push(product);

      return acc;
    }, {})
  : {};
    

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="category-page">
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      {searchTerm}

      <div style={{ gap: "20px", justifyContent: "center", width: "100%" }}>
        {Object.entries(groupedProducts).map(([category, brands]) => (
            <section className="category-section">
                <h2 className="category-title">{category}</h2>
                <div className="brands-container">
                  {Object.entries(brands).map(([brand, products]) => (
                    <div className="brand-section">
                         <h3 className="brand-title">{brand}</h3>
                         <div className="products-grid">
                         
                            <Box
                                  Mobject={products}
                                  Dobject={products}
                           SelectedProduct={SelectedProduct}
                           
                   
                                 
                                
                                  highlightText={highlightText}
                                 
                               
                                />
                       
                         </div>
                       </div>
                  ))}
                </div>
              </section>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
