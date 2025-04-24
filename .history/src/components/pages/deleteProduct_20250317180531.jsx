mport React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000"; // Change to your actual API URL

const DBProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    fetch(${API_URL}/products)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Delete product by ID
  const handleDelete = (id) => {
    fetch( `${api}/products/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setProducts(products.filter((product) => product.id !== id)); // Remove from state
        } else {
          console.error("Error deleting product");
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <div>
      <h1>Product Management</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ padding: "16px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: "red", color: "white", padding: "8px", border: "none", cursor: "pointer" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProducts;