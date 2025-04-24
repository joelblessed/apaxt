import React, { useState, useEffect } from 'react';

const DeleteCart = () => {
  const [cart, setCart] = useState([]);

  // Fetch cart items from the database when component mounts
  useEffect(() => {
    fetch('http://localhost:4000/cart')
      .then(response => response.json())
      .then(data => setCart(data))
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  // Function to delete an item from the cart
  const deleteItem = async (itemId) => {
    try {
      await fetch( `http://localhost:000/cart/${itemId}`, {
        method: 'DELETE',
      });

      // Remove the deleted item from state
      setCart(cart.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>No items in the cart</p> : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity}
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteCart