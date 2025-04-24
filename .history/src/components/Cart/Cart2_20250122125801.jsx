import React from "react";
import Products from "../products";
import { useState, useEffect } from "react";

function Cart2({ searchTerm, highlightText}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch images from the local API
    fetch("http://localhost:4000/cart?_sort=_id&_order=desc") // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 

//  Increment Products

// Function to increment quantity in the database
const incrementQuantity = async (itemId, currentQuantity) => {
  const updatedQuantity = currentQuantity + 1;

  try {
    await fetch(`http://localhost:4000/cart/${itemId}`, {
      method: 'PATCH',  // Use PATCH to update a specific field
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: updatedQuantity }),
    });

    // Update local state to reflect the changes
    setProducts(products.map(item => 
      item.id === itemId ? { ...item, quantity: updatedQuantity } : item
    ));
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};
  return (
    <div style={{ background: "none" }}>
      <div className="box1" style={{ width: "100%" }}>
        <h1></h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {cart.map((item) => (
              
            ))}
            <div>
          
        
        )}
      </div>
    </div>
  );
}

export default Cart2;
