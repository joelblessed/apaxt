import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ">"

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [visibleRange, setVisibleRange] = useState([0, 4]); // Show first 5 brands

  useEffect(() => {
    fetch("http://localhost:5000/products/") // Change to "http://localhost:3000/products" if using json-server
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);

        if (!data.products) {
          console.error("Error: 'products' is undefined. Check db.json structure.");
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

        setBrands(Object.values(brandMap)); // Store unique brands
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

      {/* Buttons to scroll through brands */}
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