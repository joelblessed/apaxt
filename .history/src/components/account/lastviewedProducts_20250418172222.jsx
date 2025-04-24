import React, { useEffect, useState } from 'react';

const LastViewedProducts = ({ userId }) => {
  const [viewedProducts, setViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViewedProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/viewedProducts/${userId});
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