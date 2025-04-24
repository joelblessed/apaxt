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

const ProductsByOwner = ({
  api,
  glofilteredProducts,
  loaderRef,
  SelectedProduct,
  highlightText,
  searchTerm,
  setSearchTerm,
}) => {
  const { ownerName } = useParams();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [ownersProducts, setAllProducts] = useState([]);
  const [generalProducts, setGeneralProducts] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [category, setCategory] = useState("All");
  console.log(category);
  // Fetch all products

  useEffect(() => {
    fetch(`${api}/AllProducts`)
      .then((response) => response.json())
      .then((data) => {
        const fetched = data.products || data;
        const filteredByOwner = fetched.filter(
          (product) => product.owner === ownerName
        );
        setAllProducts(filteredByOwner);
      })
      .catch((error) => console.error("Error fetching profies:", error));
  }, [api]);

  // const searchTerm = ownerName;

  // // Memoized fuse instance for search
  // const fuse = useMemo(() => new Fuse(glofilteredProducts, {
  //   keys: ["name", "category", "owner", "brand.name"],
  //   threshold: 0.3,
  // }), [glofilteredProducts]);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    const res = await fetch(`${api}/products?page=${page}&limit=5`);
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
  }, [page]);

  // // Handle infinite scroll
  // useEffect(() => {
  //   if (!hasMore) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setPage(prev => prev + 1);
  //       }
  //     },
  //     { rootMargin: "100px" }
  //   );

  //   const currentLoader = loaderRef.current;
  //   if (currentLoader) observer.observe(currentLoader);

  //   return () => {
  //     if (currentLoader) observer.unobserve(currentLoader);
  //   };
  // }, [hasMore]);

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

  const handleProductClick = useCallback(
    (product) => {
      SelectedProduct(product);
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      navigate("/selectedProduct");
    },
    [SelectedProduct, navigate]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // OwnersProducts search
  useEffect(() => {
    if (ownerName || (searchTerm.trim() !== "" && searchTerm)) {
      const fuse = new Fuse(ownersProducts, {
        keys: ["name", "category", "owner", "brand.name"],
        threshold: 0.3,
      });

      if (searchTerm.length === 0) {
        const results = fuse.search(ownerName.trim());
        const matched = results.map((res) => res.item);

        setProducts(matched);
        setHasMore(false); // Stop pagination on search
      } else {
        const results = fuse.search(searchTerm.trim());
        const matched = results.map((res) => res.item);

        setProducts(matched);
        setHasMore(false); // Stop pagination on search
      }
    } else {
      setProducts(ownersProducts); // Reset to owner's products
      setHasMore(true); // Enable pagination again
    }
  }, [searchTerm, ownersProducts, ownerName]);

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
          ? fetched.filter((product) => product.category === category)
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
    debouncedSearch(searchTerm);

    // Cleanup debounce function when the component unmounts or searchTerm changes
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  // general products fetch
  useEffect(() => {
    if (ownerName || category ) (searchTerm.trim() !== "" && searchTerm)) {
      // Use fuse search if products already loaded
      const fuse = new Fuse(glofilteredProducts, {
        keys: ["name", "category", "owner", "brand.name"],
        threshold: 0.3,
      });

      if (searchTerm.length === 0) {
        const results = fuse.search(ownerName.trim());

        const matched = results.map((res) => res.item);

        setGeneralProducts(matched);
        setHasMore(false); // Stop pagination on search
      } else if (searchTerm.length === 0  && ownerName ) {
        const results = fuse.search(category.trim());

        const matched = results.map((res) => res.item);

        setGeneralProducts(matched);
        setHasMore(false); // Stop pagination on search
      } else {
        const results = fuse.search(searchTerm.trim());

        const matched = results.map((res) => res.item);
        const noOwner = matched.filter(
          (product) => product.owner !== ownerName
        );
        setGeneralProducts(noOwner);
        setHasMore(false); // Stop pagination on search
      }
    } else {
      setProducts(products); // Reset to original products
      setHasMore(true); // Enable pagination again
    }
  }, [searchTerm, glofilteredProducts, products]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      const data = await response.json();
      const fetched = data.products || data;
      const filteredByOwner = fetched.filter(
        (product) => product.owner === ownerName
      );
      setProducts(filteredByOwner);
      // setProducts(data);

      // Extract unique categories from the products
      const uniqueCategories = [
        ...new Set(fetched.map((product) => product.category)),
      ];
      setUniqueCategories(uniqueCategories);
    };
    fetchProducts();
  }, [api]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ marginTop: "80px", marginLeft: "30px", marginRight: "-70px" }}
      >
        <h4>{ownerName}'s Products</h4>

        {uniqueCategories.map((categoryName, index) => (
          <label
            onClick={() => setCategory(categoryName)}
            style={{
              cursor: "pointer",
              fontWeight: category === categoryName ? "bold" : "normal",
              color: category === categoryName ? "blue" : "black",
              display: "grid",

              marginBottom: "5px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            key={index}
          >
            {categoryName}
          </label>
        ))}
      </div>
      <div>
        {products.length > 0 ? (
          <div>
            <h4 style={{ textAlign: "center", marginTop: "40px" }}>
              {ownerName} Products
            </h4>
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
          <h4 style={{ textAlign: "center", marginTop: "40px" }}>
            {" "}
            {ownerName} dosen't have the products Found{" "}
          </h4>
        )}

        {generalProducts.length > 0 && (
          <div>
            <h4 style={{ textAlign: "center", marginTop: "40px" }}>
              Product other Sellers
            </h4>
            <Box
              Mobject={generalProducts}
              Dobject={generalProducts}
              loaderRef={loaderRef}
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
