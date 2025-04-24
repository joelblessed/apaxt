import React, { useState, useEffect } from "react";

const Test = ({ filteredProducts, api }) => {

  const [products, setProducts] = useState(filteredProducts);

  // // Fetch products from db.json
  // useEffect(() => {
  //   fetch('/db.json')
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data.products));
  // }, []);

  // Function to handle product selection
  const handleSelect = (id) => {
    // Update the selected product
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, isSelected: true } : product
    );
    setProducts(updatedProducts);

    // Unselect the product after 2 seconds
    setTimeout(() => {
      const unselectedProducts = updatedProducts.map((product) =>
        product.id === id ? { ...product, iselected: false } : product
      );
      setProducts(unselectedProducts);
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleSelect(product.id)}>
              {product.selected ? 'Selected' : 'Select'}
            </button>
            {product.selected && <span> (Selected)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Test