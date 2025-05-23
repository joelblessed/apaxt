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
  api,
  glofilteredProducts,
  loaderRef,
  SelectedProduct,
  highlightText,
  searchTerm,
  setSearchTerm,
}) => {
  // const { ownerName } = useParams();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  // const { categoryName } = useParams();
  const [ownersProducts, setOwnersProducts] = useState([]);
  const [generalProducts, setGeneralProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [category, setCategory] = useState("");
 const location = useLocation();
 const params =new URLSearchParams(location.search);
 const ownerName = params.get("ownerName")



  // Fetch all owner's products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, allProductsRes] = await Promise.all([
          fetch(`${api}/products`),
          fetch(`${api}/allProducts`)
        ]);
        
        const productsData = await productsRes.json();
        const allProductsData = await allProductsRes.json();
        
        const fetched = productsData.products || productsData;
        const allFetched = allProductsData.products || allProductsData;
        
        // Filter by owner
        const filteredByOwner = allFetched.filter(
          (product) => product.owner === ownerName
        );
        
        setOwnersProducts(filteredByOwner);
        setProducts(filteredByOwner);
        
        // Extract unique categories
        const uniqueCategories = [
          ...new Set(filteredByOwner.map((product) => product.category)),
        ];
        setUniqueCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [api, ownerName]);

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

      setProducts(prev => {
        const ids = new Set(prev.map(p => p.id));
        const newItems = fetched.filter(item => !ids.has(item.id));
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
          setPage(prev => prev + 1);
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

  const mBoxWidth = "90%";
  const mBoxMarginRight = "30px";

  return (
    <div style={{ display: "flex" }}>
      {ownerName ? "owerTest": "no ownerTest"}
      <div
        style={{
          marginTop: "80px",
          marginLeft: "10px",
          marginRight: "-60",
          position: "fixed",
          left: "0px",
        }}
      >
        <h4 style={{ width: "100px", textAlign: "center" }}>
          {ownerName}'s Products
        </h4>

        {uniqueCategories.map((categoryName, index) => (
          <div
            onClick={() => setCategory(categoryName === category ? "" : categoryName)}
            style={{
              cursor: "pointer",
              fontWeight: category === categoryName ? "bold" : "normal",
              color: category === categoryName ? "blue" : "black",
              display: "grid",
              marginBottom: "5px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100px",
              overflow: "hidden",
            }}
            key={index}
          >
            <label>{categoryName}</label>
          </div>
        ))}
      </div>
      <div style={{ marginLeft: "120px" }}>
        {products.length > 0 ? (
          <div>
            <h4 style={{ textAlign: "center", marginTop: "40px" }}>
              {ownerName}'s Products
            </h4>
            <Box
              Mobject={products}
              Dobject={products}
              loaderRef={loaderRef}
              mBoxWidth={mBoxWidth}
              SelectedProduct={SelectedProduct}
              mBoxMarginRight={mBoxMarginRight}
              handleProductClick={handleProductClick}
              highlightText={highlightText}
            />
          </div>
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
  );
};

export default ProductsByOwner;