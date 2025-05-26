import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link } from "react-router-dom";
import Box from "./boxes";
import { debounce } from "lodash";
import Fuse from "fuse.js";
import { useLocation } from "react-router-dom";

const ProductsByOwner = ({
  api = "https://apaxt-api.onrender.com", // Prevents undefined API error
  glofilteredProducts = [],
  loaderRef = { current: null },
  SelectedProduct = () => {},
  highlightText = "",
  searchTerm = "",
  setSearchTerm = () => {},
}) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [ownersProducts, setOwnersProducts] = useState([]);
  const [generalProducts, setGeneralProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ownerName = params.get("ownerName") || "joelblessed";
  const categoryListRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch all owner's products and categories
  useEffect(() => {
    if (!api || !ownerName) return;
    const fetchData = async () => {
      try {
        const [ allProductsRes, categoriesRes] = await Promise.all([
         
          fetch(`${api}/allProducts`),
          fetch(`${api}/search?query=${encodeURIComponent(ownerName)}`),
        ]);

        const allProductsData = await allProductsRes.json();
        const categoriesData = await categoriesRes.json();
        console.log("cater", categoriesData);
        console.log("allp",allProductsData)

    
        const allFetched = allProductsData.products || allProductsData;
        const allCategories = categoriesData.results || categoriesData;

        // Filter by owner
        const filteredByOwner = allFetched.filter(
          (product) => product.owner === ownerName
        );

        setOwnersProducts(filteredByOwner);
        setProducts(filteredByOwner);
        setAllCategories(allCategories);

        // Extract unique categories from owner's products
        const ownerCategories = [
          ...new Set(filteredByOwner.map((product) => product.category)),
        ];
        setUniqueCategories(ownerCategories);
        console.log("uniqp",ownerCategories)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [api, ownerName]);

  // Close categories when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryListRef.current && !categoryListRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch more products with pagination
  const fetchMoreProducts = useCallback(async () => {
    if (!hasMore) return;

    try {
      const res = await fetch(`${api}/products?page=${page}&limit=5`);
      const data = await res.json();
      const fetched = data.products || data;

      if (fetched.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newItems = fetched.filter((item) => !ids.has(item.id));
        return [...prev, ...newItems];
      });
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  }, [api, page, hasMore]);

  // Handle infinite scroll
  useEffect(() => {
    if (!hasMore || !loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loaderRef]);

  // Fetch more products when page changes
  useEffect(() => {
    if (page > 1) {
      fetchMoreProducts();
    }
  }, [page, fetchMoreProducts]);

  // Reset pagination when category changes
  useEffect(() => {
    if (category) {
      setPage(1);
      setHasMore(false); // We're filtering existing products, no need for pagination
      const filtered = ownersProducts.filter(
        (product) => product.category === category
      );
      setProducts(filtered);
    } else {
      setProducts(ownersProducts);
      setHasMore(true);
    }
  }, [category, ownersProducts]);

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
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      navigate("/selectedProduct");
    },
    [SelectedProduct, navigate]
  );

  // Search functionality
  useEffect(() => {
    if (!searchTerm) {
      if (category) {
        const filtered = ownersProducts.filter(
          (product) => product.category === category
        );
        setProducts(filtered);
      } else {
        setProducts(ownersProducts);
      }
      return;
    }

    const fuse = new Fuse(ownersProducts, {
      keys: ["name", "category", "owner", "brand.name"],
      threshold: 0.3,
    });

    const results = fuse.search(searchTerm.trim());
    const matched = results.map((res) => res.item);

    if (category) {
      const filtered = matched.filter(
        (product) => product.category === category
      );
      setProducts(filtered);
    } else {
      setProducts(matched);
    }

    setHasMore(false);
  }, [searchTerm, ownersProducts, category]);

  // General products search (other sellers)
  useEffect(() => {
    if (!searchTerm) {
      setGeneralProducts([]);
      return;
    }

    const fuse = new Fuse(glofilteredProducts, {
      keys: ["name", "category", "owner", "brand.name"],
      threshold: 0.3,
    });

    const results = fuse.search(searchTerm.trim());
    const matched = results.map((res) => res.item);
    const noOwner = matched.filter(
      (product) => product.owner !== ownerName
    );

    setGeneralProducts(noOwner);
  }, [searchTerm, glofilteredProducts, ownerName]);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategorySelect = (categoryName) => {
    setCategory(categoryName === category ? "" : categoryName);
    setShowCategories(false);
  };

  const mBoxWidth = "90%";
  const mBoxMarginRight = "30px";

  if (!ownerName) return <div>Loading owner data...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Mobile Categories - Now placed above products */}
      {isMobile && (
        <div
          ref={categoryListRef}
          style={{
            width: "100%",
            backgroundColor: "#f8f9fa",
            padding: "10px",
            transition: "max-height 0.3s ease",
            maxHeight: showCategories ? "500px" : "0",
            overflow: "hidden",
            position: "sticky",
            top: "80px",
            marginTop:"-0px",
            zIndex: 1,
            boxShadow: showCategories ? "0 2px 5px rgba(0,0,0,0.1)" : "none"
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <h5 style={{ marginBottom: "10px" }}>Owner's Categories</h5>
            {uniqueCategories.map((categoryName, index) => (
              <div
                onClick={() => handleCategorySelect(categoryName)}
                style={{
                  cursor: "pointer",
                  fontWeight: category === categoryName ? "bold" : "normal",
                  color: category === categoryName ? "blue" : "black",
                  marginBottom: "5px",
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                key={`owner-${index}`}
              >
                {categoryName}
              </div>
            ))}
          </div>

          <div>
            <h5 style={{ marginBottom: "10px" }}>All Categories</h5>
            {allCategories.map((categoryName, index) => (
              <div
                onClick={() => handleCategorySelect(categoryName.category)}
                style={{
                  cursor: "pointer",
                  fontWeight: category === categoryName.category ? "bold" : "normal",
                  color: category === categoryName.category ? "blue" : "black",
                  marginBottom: "5px",
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                key={`all-${index}`}
              >
                {categoryName.category}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Categories Toggle Button */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
            zIndex: 1,
            marginBottom: "20px",
          }}
        >
          <button
            onClick={toggleCategories}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              position: "sticky",
              top: "80px",
              zIndex: 1
            }}
          >
            {showCategories ? "Hide Categories" : "Show Categories"}
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", width: "100%" }}>
        {/* Desktop Categories Sidebar */}
        {!isMobile && (
          <div
            ref={categoryListRef}
            style={{
              marginTop: "80px",
              position: "fixed",
              left: "0px",
              width: "150px",
              backgroundColor: "#f8f9fa",
              padding: "10px",
              height: "calc(100vh - 80px)",
              overflowY: "auto",
              zIndex: 1
            }}
          >
            <h4 style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
              {ownerName}'s Products
            </h4>

            <div style={{ marginBottom: "20px" }}>
              <h5 style={{ marginBottom: "10px" }}></h5>
              {uniqueCategories.map((categoryName, index) => (
                <div
                  onClick={() => handleCategorySelect(categoryName)}
                  style={{
                    cursor: "pointer",
                    fontWeight: category === categoryName ? "bold" : "normal",
                    color: category === categoryName ? "blue" : "black",
                    marginBottom: "5px",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  key={`owner-${index}`}
                >
                  {categoryName}
                </div>
              ))}
            </div>

            <div>
              <h5 style={{ marginBottom: "10px" }}>All Categories</h5>
              {allCategories.map((categoryName, index) => (
                <div
                  onClick={() => handleCategorySelect(categoryName.category)}
                  style={{
                    cursor: "pointer",
                    fontWeight: category === categoryName.category ? "bold" : "normal",
                    color: category === categoryName.category ? "blue" : "black",
                    marginBottom: "5px",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  key={`all-${index}`}
                >
                  {categoryName.category}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products List */}
        <div
          style={{
            marginLeft: isMobile ? "0" : "150px",
            width: isMobile ? "100%" : "calc(100% - 150px)",
            padding: "20px",
            background:"",
          }}
        >
          {products.length > 0 ? (<>
            <h4 style={{ textAlign: "center", marginTop: isMobile ? "0px" : "40px"  }}>
                {ownerName}'s Products
              </h4>
            <div style={{display:"flex", flexWrap:'wrap',gap:"20px",background:"",marginTop:"30px", justifyContent:"center"}}>
              <Box
                style={{ display: "flex" }}
                Mobject={products}
                Dobject={products}
                loaderRef={loaderRef}
                mBoxWidth={mBoxWidth}
                SelectedProduct={SelectedProduct}
                mBoxMarginRight={mBoxMarginRight}
                handleProductClick={handleProductClick}
                highlightText={highlightText}
              />
            </div></>
          ) : (
            <h4 style={{ textAlign: "center", marginTop: "40px" }}>
              {ownerName} doesn't have any products matching your criteria
            </h4>
          )}

          {generalProducts.length > 0 && (
            <div>
              <h4 style={{ textAlign: "center", marginTop: "40px" }}>
                Products from Other Sellers
              </h4>
              <Box
                Mobject={generalProducts}
                Dobject={generalProducts}
                loaderRef={loaderRef}
                mBoxWidth={mBoxWidth}
                mBoxMarginRight={mBoxMarginRight}
                SelectedProduct={SelectedProduct}
                handleProductClick={handleProductClick}
                highlightText={highlightText}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsByOwner;