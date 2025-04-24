mport React, { useState } from 'react';

const Test = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      description: 'This is the description for Product 1.',
      price: '$19.99',
      image: 'https://via.placeholder.com/150',
      selected: false,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is the description for Product 2.',
      price: '$29.99',
      image: 'https://via.placeholder.com/150',
      selected: false,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is the description for Product 3.',
      price: '$39.99',
      image: 'https://via.placeholder.com/150',
      selected: false,
    },
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
                backgroundColor: product.selected ? '#aaffaa' : '#fff',
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
              {product.selected && (
                <div style={{ marginTop: '10px', fontWeight: 'bold', color: '#007bff' }}>
                  Selected
                </div>
              )}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;