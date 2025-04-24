import React, { useState, useEffect } from "react";

function DownloadCartData() {
  const [cart, setCart] = useState([]);

  // Fetch existing cart items
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("http://localhost:4000/cart");
      const data = await response.json();
      setCart(data);
    };

    fetchCart();
  }, []);

  const addToCart = async (item) => {
    setCart((prevCart) => [...prevCart, item]);

    await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  const removeFromCart = async (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  
    await fetch(`http://localhost:4000/cart/${id}`, {
      method: "DELETE",
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

export default DownloadCartData;