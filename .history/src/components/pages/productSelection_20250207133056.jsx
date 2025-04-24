import React, { useEffect, useState } from "react";

const ProductSelection = ({ api }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Track selected products

  // Fetch products from db.json
  useEffect(() => {
    fetch(`${api}products`)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Toggle product selection
  const toggleSelection = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId) // Unselect
        : [...prevSelected, productId] // Select
    );
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.productList}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            ...styles.productCard,
            border: selectedProducts.includes(product.id)
              ? '2px solid blue'
              : '1px solid #ccc',
          }}
          onClick={() => toggleSelection(product.id)}
        >
          <img src={product.image} alt={product.name} style={styles.productImage} />
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
        </div>
      ))}

      {/* Display selected products */}
      <div style={styles.selectedProducts}>
        <h2>Selected Products</h2>
        {selectedProducts.map((id) => {
          const product = products.find((p) => p.id === id);
          return <div key={product.id}>{product.name}</div>;
        })}
      </div>
    </div>
  );
};

// Styles
const styles = {
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
  },
  productCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    width: '200px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  selectedProducts: {
    marginTop: '20px',
    padding: '20px',
    borderTop: '1px solid #ccc',
  },
};
export default ProductSelection;
