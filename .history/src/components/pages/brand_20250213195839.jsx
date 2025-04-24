import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const brandsPerPage = 3; // Number of brands to display at a time

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        // Extract unique brands
        const brandMap = {};
        data.products.forEach((product) => {
          const brand = product.brand[0];
          if (!brandMap[brand.id]) {
            brandMap[brand.id] = brand;
          }
        });

        setBrands(Object.values(brandMap));
      });
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
            <Link to={/brand/${brand.id}}>
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