import React, { useEffect, useState } from "react";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the JSON server when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Toggle the selection state of a product
  const toggleSelection = (id, currentSelection) => {
    // Update the product on the server using PATCH
    fetch(http://localhost:3001/products/${id}, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isSelected: !currentSelection }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        // Update the local state to reflect the change
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
          }}
        >
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Selected:</strong> {product.isSelected ? "Yes" : "No"}
          </p>
          <button onClick={() => toggleSelection(product.id, product.isSelected)}>
            {product.isSelected ? "Unselect" : "Select"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;