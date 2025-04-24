import React, { useState, useEffect } from "react";

const ProductList = ({ ownerId }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the backend
    fetch(http://localhost:5000/api/products?ownerId=${ownerId})
      .then((response) => response.json())
      .then((data) => {
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [ownerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Products by Owner ID: {ownerId}</h2>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Status: {product.status}</p>
              <p>Posted On: {new Date(product.postedOn).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found for this owner.</p>
      )}
    </div>
  );
};

export default ProductList;
export default App;