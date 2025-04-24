import React, { useEffect, useState } from 'react';

const LastViewedProducts = ({ api }) => {
  const [viewedProducts, setViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 const  userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchViewedProducts = async () => {
      try {
        const response = await fetch(`${api}/viewedProducts/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch viewed products');
        }
        const data = await response.json();
        setViewedProducts(data);
      } catch (error) {
        console.error('Error fetching viewed products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchViewedProducts();
    }
  }, [userId]);

  if (loading) return <p>Loading viewed products...</p>;
  if (!viewedProducts.length) return <p>No viewed products found.</p>;

  return (
    <div>
      <h3>Last Viewed Products</h3>
      <ul>
        {viewedProducts.map((product) => (
          <li key={product.id}>
            Product ID: {product.productId} <br />
            Viewed at: {new Date(product.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastViewedProducts;