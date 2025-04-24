import React, { useState } from "react";

function CartUpLoad() {
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    // Update state locally
    setCart((prevCart) => [...prevCart, item]);

    // Save item to db.json
    await fetch("http://localhost:4000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
  ];

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - ${item.price}
        </div>
      ))}
    </div>
  );
}

export default CartUpLoad