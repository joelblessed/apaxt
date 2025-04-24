import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  // Visible range: [start, end) indices into the brands array.
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 3 }); // Show 3 brands initially

  useEffect(() => {
    // If using json-server running on localhost, change the URL accordingly.
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        if (!data.products || !Array.isArray(data.products)) {
          console.error("Error: 'products' not found in db.json");
          return;
        }
        // Create a map of unique brands (using the first element of product.brand)
        const brandMap = {};
        data.products.forEach((product) => {
          if (product.brand && product.brand.length > 0) {
            const brand = product.brand[0]; // Assumption: one brand per product
            if (!brandMap[brand.id]) {
              brandMap[brand.id] = brand;
            }
          }
        });
        const brandList = Object.values(brandMap);
        setBrands(brandList);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleRangeChange = (direction) => {
    setVisibleRange((prevRange) => {
      let { start, end } = prevRange;
      const count = end - start;
      if (direction === "next" && end < brands.length) {
        start += count;
        end += count;
      } else if (direction === "prev" && start > 0) {
        start -= count;
        end -= count;
      }
      return { start, end: Math.min(end, brands.length) };
    });
  };

  return (
    <div>
      <h2>Brands</h2>
      {brands.length === 0 ? (
        <p>Loading brands...</p>
      ) : (
        <div style={{ display: "flex", overflowX: "auto" }}>
          {brands.slice(visibleRange.start, visibleRange.end).map((brand) => (
            <div
              key={brand.id}
              style={{
                margin: "10px",
                textAlign: "center",
                border: "1px solid #ddd",
                padding: "10px"
              }}
            >
              <img
                src={brand.image}
                alt={brand.name}
                width="100"
                height="100"
                style={{ objectFit: "cover" }}
              />
              <p>{brand.name}</p>
              <Link to={`/brand/${brand.id}`}>
                <button>View Products</button>
              </Link>
            </div>
          ))}
        </div>
      )}
      {/* Navigation buttons for adjusting the index range */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => handleRangeChange("prev")}
          disabled={visibleRange.start === 0}
        >
          ◀ Previous
        </button>
        <button
          onClick={() => handleRangeChange("next")}
          disabled={visibleRange.end >= brands.length}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Brand;