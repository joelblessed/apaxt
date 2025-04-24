import React, { useEffect, useState, useRef } from "react";
import Box from "./boxes"
import { useNavigate, useParams, Link } from "react-router-dom";

const CategoryPage = ({
  api,
  SelectedProduct,
  highlightText,
  filteredProducts
  
}) => {

  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const searchTerm = categoryName
  

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

 
  // Fetch all products
  const filteredCategory = filteredProducts.filter(
    (product) => product.category === categoryName
  );



    useEffect(() => {
      if (searchTerm && searchTerm.trim() !== "") {
        // Use fuse search if products already loaded
        const fuse = new Fuse(glofilteredProducts, {
          keys: ["name", "category", "owner", "brand.name"],
          threshold: 0.3,
        });
    
        const results = fuse.search(searchTerm.trim());
        const matched = results.map((res) => res.item);
      
        setProducts(matched);
        setHasMore(false); // Stop pagination on search
      } else {
     
        setProducts(products); // Reset to original products
        setHasMore(true); // Enable pagination again
      }
    }, [searchTerm, glofilteredProducts, products]);
  
  
   
    const fetchSearchResults = async (query) => {
      if (!query) {
        setProducts([]); // Or fetch default list
        return;
      }
  
      const res = await fetch(`${api}/search?query=${query}`);
      const data = await res.json();
      const fetched = data.products || data;
     
      setProducts(fetched);
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
  

  return (
    <div>
      <div>
        <Box
          Mobject={filteredCategory}
          Dobject={filteredCategory}
          handleProductClick={handleProductClick}
          SelectedProduct={SelectedProduct}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
