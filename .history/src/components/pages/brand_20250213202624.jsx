import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const brandsPerPage = 2; // Number of brands to display at a time

  useEffect(() => {
    fetch("http://localhost:5000/products") // Adjust if needed: "http://localhost:3000/products"
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging step
        console.log("Type of data:", typeof data);
  
        if (!data || typeof data !== "object") {
          console.error("Error: Invalid JSON format. Ensure db.json is correct.");
          return;
        }
  
        if (!data.products) {
          console.error("Error: 'products' is undefined. Check db.json structure.");
          return;
        }
  
        // Extract unique brands
        const brandMap = {};
        data.products.forEach((product) => {
          if (product.brand && product.brand.length > 0) {
            const brand = product.brand[0]; // Assume one brand per product
            if (!brandMap[brand.id]) {
              brandMap[brand.id] = brand;
            }
          }
        });
  
        setBrands(Object.values(brandMap));
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);
  // Adjust displayed brands based on startIndex
  const visibleBrands = brands.slice(startIndex, startIndex + brandsPerPage);

  return (
    <div>
      <h1>Brands</h1>
      
      {/* Brand Bar */}
      <div className="brand-bar">
        {visibleBrands.map((brand) => (
          <div key={brand.id} className="brand-box">
            <img src={brand.image} alt={brand.name} />
            <h2>{brand.name}</h2>
            <Link to={`/brand/${brand.id}`}>
              <button>View Products</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button 
          onClick={() => setStartIndex(startIndex - brandsPerPage)} 
          disabled={startIndex === 0}
        >
          Previous
        </button>

        <button 
          onClick={() => setStartIndex(startIndex + brandsPerPage)} 
          disabled={startIndex + brandsPerPage >= brands.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Brand;