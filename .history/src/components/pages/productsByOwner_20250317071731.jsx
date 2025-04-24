import React, { useEffect, useState } from "react";

const ProductsB = ({ ownerId, api }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Construct the URL with the provided ownerId
    const fetchUrl = `${api}/products/${ownerId}`;
    
    // Fetch products for the given ownerId
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      });
  }, [ownerId, apiUrl]);

  return (
    <div>
      <h2>Products for Owner: {ownerId}</h2>
      {error && <p>{error}</p>}
      {products.length === 0 && !error ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsB;