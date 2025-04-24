import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./brand.css"

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [visibleRange, setVisibleRange] = useState([0, 4]); // Show first 5 brands

  useEffect(() => {
    fetch("/db.json") // Adjust if using json-server
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
  
        if (!data.products) {
          console.error("Error: 'products' is undefined.");
          return;
        }
  
        // Extract unique brands
        const brandMap = {};
        data.products.forEach((product) => {
          if (product.brand && product.brand.length > 0) {
            const brand = product.brand[0]; // Assuming first brand
            if (!brandMap[brand.id]) {
              brandMap[brand.id] = brand;
            }
          }
        });
  
        const brandList = Object.values(brandMap);
        console.log("Extracted brands:", brandList);
  
        setBrands(brandList); // Store unique brands
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);
  // Function to update brand visibility range
  const handleRangeChange = (direction) => {
    setVisibleRange((prev) => {
      const newStart = direction === "next" ? prev[0] + 5 : prev[0] - 5;
      const newEnd = direction === "next" ? prev[1] + 5 : prev[1] - 5;
      return [Math.max(0, newStart), Math.min(brands.length, newEnd)];
    });
  };

 
};

export default Brand;