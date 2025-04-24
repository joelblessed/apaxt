import React, { useState, useEffect } from "react";

const Test = ({api}) => {
  const [products, setProducts] = useState([]); // Full product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered list
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [categories, setCategories] = useState([]); // Unique categories

 
  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Search</h2>

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, category, or brand..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "300px", marginRight: "10px", padding: "8px" }}
      />
      <button onClick={handleSearch} style={{ padding: "8px 12px" }}>
        Search
      </button>

      {/* Display Filtered Products */}
      <div>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  width: "100px",
                  height: "100px",
                  marginRight: "20px",
                  objectFit: "cover",
                }}
              />
              <div>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand.map((b) => b.name).join(", ")}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Test;