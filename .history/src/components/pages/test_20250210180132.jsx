import React, { useState, useEffect } from "react";

const Test = ({ productId, api }) => {
  const [product, setProduct] = useState(null);

  // Fetch product from db.json based on productId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${api}/prooducts${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }

    // Cleanup function to reset product when unmounting
    return () => setProduct(null);
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default Test