import React, { useState } from "react";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Smartphone" },
    { id: 3, name: "Tablet" },
    { id: 4, name: "Smartwatch" },
  ]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 

  return (
    <div>
      <h1>Product Search</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      
    </div>
  );
};

export default ProductSearch;