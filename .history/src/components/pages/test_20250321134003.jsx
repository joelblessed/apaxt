import React, { useState } from 'react';

const ProductDisplay = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      description: 'This is the description for Product 1.',
      price: '$19.99',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is the description for Product 2.',
      price: '$29.99',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is the description for Product 3.',
      price: '$39.99',
      image: 'https://via.placeholder.com/150',
    },
    // Add more products as needed
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelect = (productId) => {
    // Find the selected product
    const product = products.find((p) => p.id === productId);

    // Remove the product from the main list
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);

    // Add the product to the selected list
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleRemoveProduct = (productId) => {
    // Find the product to remove
    const product = selectedProducts.find((p) => p.id === productId);

    // Remove the product from the selected list
    const updatedSelectedProducts = selectedProducts.filter((p) => p.id !== productId);
    setSelectedProducts(updatedSelectedProducts);

    // Add the product back to the main list
    setProducts([...products, product]);
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Product List */}
      <div style={{ flex: 2, marginRight: '20px' }}>
        <h2>Products</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                width: '200px',
                textAlign: 'center',
              }}
              onClick={() => handleProductSelect(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>{product.price}</strong></p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Products Preview */}
      <div style={{ flex: 1 }}>
        <h2>Selected Products</h2>
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#aaffaa',
              marginBottom: '10px',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>{product.price}</strong></p>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#ff4444',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;