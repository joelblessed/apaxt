import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Brand = ({filteredProducts}) => {
  const [products, setProducts] = useState(filteredProducts);
  const [visibleProducts, setVisibleProducts] = useState(6); // Initially show 6 products

  // useEffect(() => {
  //   fetch("/db.json")
  //     .then(response => response.json())
  //     .then(data => setProducts(data.products));
  // }, []);

  // Group products by brand
  const groupedProducts = products.reduce((acc, product) => {
    const brand = product.brand[0]; // Extract brand from the array (first element)
    if (!acc[brand.id]) {
      acc[brand.id] = { brand, products: [] };
    }
    acc[brand.id].products.push(product);
    return acc;
  }, {});

  // Create an array of brands with their products
  const brandsWithProducts = Object.values(groupedProducts);

  // Show More functionality (display all products)
  const showMoreProducts = () => {
    setVisibleProducts(products.length); // Show all products
  };

  return (
    <div>
      <h1>Products by Brand</h1>

      {brandsWithProducts.map(({ brand, products }) => (
        <div key={brand.id} className="brand-section">
          <h2>{brand.name}</h2>
          <div className="product-list">
            {products.slice(0, visibleProducts).map(product => (
              <div key={product.id} className="product-box">
                <img src={product.images} alt={product.name} />
                <h3>{product.name}</h3>
              </div>
            ))}
          </div>
          <Link to={`/brand/${brand.id}`}>
            <button>View All {brand.name} Products</button>
          </Link>
        </div>
      ))}

      {visibleProducts < products.length && (
        <button onClick={showMoreProducts}>Show More Products</button>
      )}
    </div>
  );
};

export default Brand;