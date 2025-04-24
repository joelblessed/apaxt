import React, { useState, useEffect } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  // Fetch cart items from mock db.json (using json-server)
  useEffect(() => {
    fetch('http://localhost:3000/cart')
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error('Error fetching cart:', error));
  }, []);

  // Function to increment quantity in the database
  const incrementQuantity = async (itemId, currentQuantity) => {
    const updatedQuantity = currentQuantity + 1;

    try {
      await fetch(http://localhost:3000/cart/${itemId}, {
        method: 'PATCH',  // Use PATCH to update a specific field
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: updatedQuantity }),
      });