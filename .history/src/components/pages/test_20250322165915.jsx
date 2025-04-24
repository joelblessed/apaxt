import { useState, useEffect } from "react";

const Test = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All"); // Default category
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products") // Adjust URL if needed
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products by category
  const MofilteredProducts =
    category === "All" ? products : products.filter((product) => product.category === category);

  return (
    <div>
      {/* Category List */}
      <ul>
        {categories.map((cat, index) => (
          <li
            key={index}
            onClick={() => setCategory(cat)}
            style={{
              cursor: "pointer",
              fontWeight: category === cat ? "bold" : "normal",
              color: category === cat ? "blue" : "black",
            }}
          >
            {cat}
          </li>
        ))}
      </ul>

      {/* Display Products */}
      <div>
        {filteredProductMos.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Test;