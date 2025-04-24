import { useEffect, useState } from "react";

const ProductsByOwner = () => {
  const [products, setProducts] = useState([]);
// const ownerId = localStorage.getItem("userId"); 
const ownerId = 1; // Hardcoded for testing
  useEffect(() => {
    fetch(`http://localhost:5000/products/${ownerId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [ownerId]);

  return (
    <div>
      <h2>Products by Owner {ownerId}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>Owner: {product.owner}</p>
            <p>City: {product.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsByOwner;