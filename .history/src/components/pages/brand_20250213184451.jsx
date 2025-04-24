import React, { useState, useEffect } from "react";

const Brand = ({filteredProducts}) => {
  const [products, setProducts] = useState(filteredProducts);
  const [visibleBrands, setVisibleBrands] = useState(5); // Initial number of brands to display

//   useEffect(() => {
//     fetch("/db.json")
//       .then((response) => response.json())
//       .then((data) => setProducts(data.products));
//   }, []);

//   const brands = products.reduce((acc, product) => {
//     if (!acc.some((brand) => brand.id === product.brand.id)) {
//       acc.push(product.brand);
//     }
//     return acc;
//   }, []);

  const showMoreBrands = () => {
    setVisibleBrands(brands.length);
  };

  return (
    <div>
      <h1>Products by Brand</h1>
      <div className="brands">
        {brands.slice(0, visibleBrands).map((brand) => (
          <div key={brand.id} className="brand-box">
            <img src={brand.image} alt={brand.name} />
            <h3>{brand.name}</h3>
          </div>
        ))}
      </div>
      {visibleBrands < brands.length && (
        <button onClick={showMoreBrands}>Show More</button>
      )}
    </div>
  );
};

export default Brand