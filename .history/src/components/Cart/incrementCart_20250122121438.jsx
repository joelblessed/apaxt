import React, { useState, useEffect } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  // Fetch cart items from mock db.json (using json-server)
  useEffect(() => {
    fetch('http://localhost:4000/cart/')
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error('Error fetching cart:', error));
  }, []);

  // Function to increment quantity in the database
  const incrementQuantity = async (itemId, currentQuantity) => {
    const updatedQuantity = currentQuantity + 1;

    try {
      await fetch(`http://localhost:4000/cartdb/${itemId}`, {
        method: 'PATCH',  // Use PATCH to update a specific field
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: updatedQuantity }),
      });

      // Update local state to reflect the changes
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: updatedQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => incrementQuantity(item.id, item.quantity)}>
              +1
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;