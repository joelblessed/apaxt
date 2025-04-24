import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CategoryBox from "./categoryBox";


const Category = ({
  searchTerm,
  setSearchTerm,
  api,
  glofilteredProducts,
  
  highlightText,
  SelectedProduct,
  
}) => {
 

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [mproducts, setMProducts] = useState([]);

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    // Handle fetching new products based on page or other conditions
    // Example:
    const res = await fetch(`${api}/products?page=${page}&limit=4`);
    const data = await res.json();
    const fetched = data.products || data;

    if (fetched.length === 0) setHasMore(false);

    // Set filtered products based on fetched data
    const uniqueProducts = (prev, newItems) => {
      const ids = new Set(prev.map((p) => p.id));
      return [...prev, ...newItems.filter((item) => !ids.has(item.id))];
    };
    
    setFilteredProducts((prev) => uniqueProducts(prev, fetched));
    setProducts((prev) => uniqueProducts(prev, fetched));
  
  }, [page ]);

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


  useEffect(() => {
    if (searchTerm && window.innerWidth < 768) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300); // delay allows render
    }
  }, [searchTerm]);



  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      // Use fuse search if products already loaded
      const fuse = new Fuse(glofilteredProducts, {
        keys: ["name", "category", "owner", "brand.name"],
        threshold: 0.3,
      });
  
      const results = fuse.search(searchTerm.trim());
      const matched = results.map((res) => res.item);
      setFilteredProducts(matched);
      setProducts(matched);
      setHasMore(false); // Stop pagination on search
    } else {
      setFilteredProducts(products); // Reset when search clears
      setProducts(products); // Reset to original products
      setHasMore(true); // Enable pagination again
    }
  }, [searchTerm, glofilteredProducts, products]);


 
  const fetchSearchResults = async (query) => {
    if (!query) {
      setFilteredProducts([]); // Or fetch default list
      return;
    }

    const res = await fetch(`${api}/search?query=${query}`);
    const data = await res.json();
    setFilteredProducts(data);
    setProducts(data);
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

 
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  const groupByCategory = (filteredProducts) => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(filteredProducts);
  // const  Dobject = Object.keys(groupedProducts).map((category) =>groupedProducts[category].slice(0,5)).flat()
  const Dobject = Object.keys(groupedProducts);
  const Dobject1 = Dobject.reduce((acc, category) => {
    acc[category] = groupedProducts[category].slice(0, 5);
    return acc;
  },{});
  return (
    <div>
      <div>
        <CategoryBox
          Mobject={}
          Dobject={Dobject}
          Dobject1={Dobject1}
          SelectedProduct={SelectedProduct}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default Category;
