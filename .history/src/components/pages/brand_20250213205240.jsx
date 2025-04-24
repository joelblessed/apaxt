import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [visibleRange, setVisibleRange] = useState([0, 4]); // Show first 5 brands

  useEffect(() => {
    fetch("/db.json") // If using json-server, use "http://localhost:3000/products"
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
  
        if (!data.products || !Array.isArray(data.products)) {
          console.error("Error: 'products' is missing or not an array.");
          return;
        }
  
        // Extract unique brands
        const brandMap = {};
        data.products.forEach((product) => {
          if (product.brand && Array.isArray(product.brand) && product.brand.length > 0) {
            const brand = product.brand[0]; // Use first brand in the array
            if (!brandMap[brand.id]) {
              brandMap[brand.id] = brand;
            }
          }
        });
  
        const brandList = Object.values(brandMap);
        console.log("Extracted brands:", brandList);
  
        setBrands(brandList);
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

  return (
    <div>
      <h2>Brands</h2>
  
      {/* Show loading message if brands are empty */}
      {brands.length === 0 ? (
        <p>Loading brands...</p>
      ) : (
        <div style={{ display: "flex", overflowX: "auto" }}>
          {brands.slice(visibleRange[0], visibleRange[1]).map((brand) => (
            <div key={brand.id} style={{ margin: "10px", textAlign: "center" }}>
              <img src={brand.image} alt={brand.name} width="100" height="100" />
              <p>{brand.name}</p>
              <Link to={`/brand/${brand.id}`}>
                <button>View Products</button>
              </Link>
            </div>
          ))}
        </div>
      )}
  
      {/* Buttons to navigate through brands */}
      <div>
        <button onClick={() => handleRangeChange("prev")} disabled={visibleRange[0] === 0}>
          ◀ Previous
        </button>
        <button onClick={() => handleRangeChange("next")} disabled={visibleRange[1] >= brands.length}>
          Next ▶
        </button>
      </div>
    </div>
  );
  
};

export default Brand;