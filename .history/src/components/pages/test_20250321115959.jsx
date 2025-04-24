import React, { useState } from 'react';

const  = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', selected: false },
    { id: 2, name: 'Product 2', selected: false },
    { id: 3, name: 'Product 3', selected: false },
    // Add more products as needed
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelect = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, selected: !product.selected } : product
    );

    setProducts(updatedProducts);

    const selected = updatedProducts.filter((product) => product.selected);
    setSelectedProducts(selected);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h2>Products</h2>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              padding: '10px',
              margin: '5px',
              border: '1px solid #ccc',
              backgroundColor: product.selected ? '#aaffaa' : '#fff',
              cursor: 'pointer',
            }}
            onClick={() => handleProductSelect(product.id)}
          >
            {product.name}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <h2>Selected Products</h2>
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            style={{
              padding: '10px',
              margin: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#aaffaa',
            }}
          >
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ;