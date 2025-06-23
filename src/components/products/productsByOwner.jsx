import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import Fuse from "fuse.js";
import Box from "../ProductCards/boxes";
import "./products.css";
import "../translations/i18n";
import { main } from "@popperjs/core";

const ProductsByOwner = ({
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
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isCategory, setIsCategory] = useState(true);
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [isBrand, setIsBrand] = useState(false);
  const [isMobile, setIsMobile ] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { sellerId, ownerName } = useParams();
  



    const location = useLocation();
    // const params = new URLSearchParams(location.search);
    // const ownerName = params.get("ownerName");

    // Function to check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };
  
    useEffect(() => {
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize); // Update on resize
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
const normalize = (str) =>
  typeof str === "string"
    ? str.trim().toLowerCase().replace(/\s+/g, " ")
    : "";
 
   // Category/subcategory/brand structure
 const nestedCategoryStructure = useMemo(() => {
   // Only recalculate when glofilteredProducts or userId changes
   if (!Array.isArray(glofilteredProducts)) return {};
 
   const structure = {};
   const displayMap = {};
 
   for (const product of glofilteredProducts) {
     // Only include products for this user
     if (!product.user_products?.some(up => up.owner === ownerName)) continue;
 
     const rawMain = product.category?.main;
     const rawSub = product.category?.sub;
     const rawBrand = product.brand?.name;
     const main = normalize(rawMain);
     const sub = normalize(rawSub);
     const brand = normalize(rawBrand);
 
     if (!main || !sub || !brand) continue;
 
     // Store display names for later
     if (!displayMap[main]) displayMap[main] = rawMain;
     if (!displayMap[`${main}|${sub}`]) displayMap[`${main}|${sub}`] = rawSub;
     if (!displayMap[`${brand}|${brand}`]) displayMap[`${brand}|${brand}`] = rawBrand;
 
     // Build structure
     if (!structure[main]) structure[main] = {};
     if (!structure[main][sub]) structure[main][sub] = new Set();
     structure[main][sub].add(brand);
   }
 
   // Convert Sets to arrays and restore original display names
   const result = {};
   for (const main of Object.keys(structure)) {
     const subMap = structure[main];
     const displayMain = displayMap[main];
     result[displayMain] = {};
     for (const sub of Object.keys(subMap)) {
       const displaySub = displayMap[`${main}|${sub}`];
       result[displayMain][displaySub] = Array.from(subMap[sub]).map(
         (brandKey) => displayMap[`${brandKey}|${brandKey}`]
       );
     }
   }
   return result;
 }, [glofilteredProducts, userId]);
 
 
  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    const res = await fetch(
       `${api}/userProducts?owner_id=${sellerId}&page=${page}&limit=20`
    );
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
    : fetched.filter((product) => product?.category?.main === category);

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
    if (searchTerm  && window.innerWidth < 1000) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  }, [searchTerm]);

  // const handleProductClick = useCallback(
  //   (product) => {
  //     SelectedProduct(product);
  //     localStorage.setItem("selectedProduct", JSON.stringify(product));
  //     navigate("/selectedProduct");

  //     fetch(`${api}/viewedProducts`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         userId: userId,
  //         productId: product.id
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log("Viewed product saved:", data))
  //       .catch((error) => console.error("Error:", error));
  //   },
  //   [SelectedProduct, navigate]
  // );

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
              `${api}/search?owner_id=${userId}&query=${encodeURIComponent(
          query
        )}&page=${currentPage}&limit=50`
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
                   : fetched.filter((product) => product.category.main === category);

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
    <>
      {isMobile ? (
       
         
  <div style={{ width: "100%" }}>
 <div style={{}}>

  <div style={{justifyContent:"center", textAlign:'center', }}><h3>Products By {ownerName}</h3></div>
         

  {Object.entries(nestedCategoryStructure).map(([mainCategory, subCategoryMap]) => (
    <div key={mainCategory} style={{ marginBottom: "10px" }}>
      {/* Main Category Dropdown */}
      <div style={{display:"flex",justifyContent:'space-between'}}>
      <div
        onClick={() => {
          setProducts([]);
          setPage(1);
          setHasMore(true);
          setSearchTerm(mainCategory);
           setIsSubcategory(!isSubcategory);
          
        }}
        style={{
          padding: "12px",
          background: "#f0f0f0",
          borderRadius: "4px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer"
        }}
      >
        <span>{mainCategory}</span>
        
      </div>
      <button  onClick={() => {
         
          setCategory(mainCategory);
          
          setIsSubcategory(!isSubcategory);
        }} >{isSubcategory && mainCategory === category ? (
                <svg
                  width="20px"
                  fill="red"
                  height="20px"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h48v48H0z" fill="none" />
                  <g id="Shopicon">
                    <g>
                      <polygon points="24,29.171 9.414,14.585 6.586,17.413 24,34.827 41.414,17.413 38.586,14.585 		" />
                    </g>
                  </g>
                </svg>
              ) : (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 48 48"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h48v48H0z" fill="none" />
                  <g id="Shopicon">
                    <polygon points="6.586,30.586 9.414,33.414 24,18.828 38.586,33.414 41.414,30.586 24,13.172 	" />
                  </g>
                </svg>
              )}</button>
      </div>

      {/* Subcategory Dropdown (only shown when category is selected) */}
      {isSubcategory && mainCategory === category && (
        <div style={{ marginLeft: "15px", marginTop: "5px" }}>
          {Object.entries(subCategoryMap).map(([subCategory, brands]) => (
            <div key={subCategory}>
              <div style={{display:"flex",justifyContent:'space-between'}}>
              <div
                onClick={() => {
                  setSearchTerm(subCategory);
                  setProducts([]);
                  setPage(1);
                  setHasMore(true);
                  setIsBrand(!isBrand);
                   setIsSubcategory(!isSubcategory);
                }}
                style={{
                  padding: "10px",
                  background: "#f8f8f8",
                  borderRadius: "4px",
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <span>{subCategory}</span>
              
              </div>

                <button   onClick={() => {
                  setSubCategory(subCategory);
                
                  setIsBrand(!isBrand);
                }}>{isBrand && subcategory === subCategory ? (
                <svg
                  width="20px"
                  fill="red"
                  height="20px"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h48v48H0z" fill="none" />
                  <g id="Shopicon">
                    <g>
                      <polygon points="24,29.171 9.414,14.585 6.586,17.413 24,34.827 41.414,17.413 38.586,14.585 		" />
                    </g>
                  </g>
                </svg>
              ) : (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 48 48"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h48v48H0z" fill="none" />
                  <g id="Shopicon">
                    <polygon points="6.586,30.586 9.414,33.414 24,18.828 38.586,33.414 41.414,30.586 24,13.172 	" />
                  </g>
                </svg>
              )}</button>
              </div>

              {/* Brands List (only shown when subcategory is selected) */}
              {isBrand && subcategory === subCategory && (
                <div style={{ marginLeft: "15px" }}>
                  {brands.map((brand) => (
                    <div
                      key={brand}
                      onClick={() => {
          setIsSubcategory(!isSubcategory);

                        setBrand(brand);
                        setSearchTerm(brand);
                        setProducts([]);
                        setPage(1);
                        setHasMore(true);
                      }}
                      style={{
                        padding: "8px",
                        background: "#ffffff",
                        borderBottom: "1px solid #eee",
                        cursor: "pointer"
                      }}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>
  <div
    className="products-container"
    style={{ background: "", width: "100%" }}
  >
 
    <Box
      Mobject={products}
      Dobject={products}
      loaderRef={loaderRef}
      SelectedProduct={SelectedProduct}
      highlightText={highlightText}
      category={category}
    />
    {hasMore && (
      <div ref={loaderRef} className="loader">
        Loading...p
      </div>
    )}
  </div>
</div>
      ) : (<> <div style={{justifyContent:"center", textAlign:'center', }}><h3>Products By {ownerName}</h3></div>
           <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "1rem",
              fontFamily: "Arial",
              height: "100vh",
              overflowY: "auto",
              boxShadow: "10px red ",
              borderRight: "1px solid black",
              margin: "10px",
              background: "white",
              position: "sticky",
              top: "120px", // Make it sticky to the top
              zIndex: 1000, // Ensure it stays above other content
            }}
          >
        
            {Object.entries(nestedCategoryStructure).map(
              ([mainCategory, subCategoryMap]) => (
                <div key={mainCategory} style={{ marginBottom: "1.5rem" }}>
                  <h3
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      setCategory(mainCategory);
                      // setSearchTerm(mainCategory); // Clear search term when selecting category
                      setProducts([]); // Reset products when changing category
                      setPage(1); // Reset page to 1 when changing category
                      setHasMore(true); // Enable pagination again
                      // window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on category change
                    }}
                  >
                    {mainCategory}
                  </h3>
                  <div style={{ paddingLeft: "1rem" }}>
                    {Object.entries(subCategoryMap).map(
                      ([subCategory, brands]) => (
                        <div key={subCategory} style={{ marginBottom: "1rem" }}>
                          <h4
                            onClick={() => {
                              setCategory(subCategory);
                              setSearchTerm(subCategory); // Clear search term when selecting category
                              setProducts([]); // Reset products when changing category
                              setPage(1); // Reset page to 1 when changing category
                              setHasMore(true); // Enable pagination again
                              // window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on category change
                            }}
                          >
                            ↳ {subCategory}
                          </h4>
                          <ul
                            style={{
                              overflowY: "auto",
                              maxHeight: "200px",
                              padding: "0",
                              listStyleType: "none",
                            }}
                          >
                            {brands.map((brand) => (
                              <label
                                style={{
                                  display: "block",
                                  overflowY: "auto",
                                  maxHeight: "50px",
                                }}
                                onClick={() => {
                                  setCategory(brand);
                                  setSearchTerm(brand); // Clear search term when selecting category
                                  setProducts([]); // Reset products when changing category
                                  setPage(1); // Reset page to 1 when changing category
                                  setHasMore(true); // Enable pagination again
                                  // window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on category change
                                }}
                                key={brand}
                              >
                                {brand}
                              </label>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          <div
            className="products-container"
            style={{ background: "", width: "90%", height: "100%", }}
          >
     

            <Box
              Mobject={products}
              Dobject={products}
              loaderRef={loaderRef}
              SelectedProduct={SelectedProduct}
              // handleProductClick={handleProductClick}
              highlightText={highlightText}
              category={category}
            />
            {hasMore && (
              <div ref={loaderRef} className="loader">
                Loading...
              </div>
            )}{" "}
            {/* Loader for infinite scroll */}
          </div>
        </div>
     </> )}
    </>
  );
};

export default ProductsByOwner;
