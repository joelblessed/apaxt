import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Checkout = ({ api, setCalculateTotal, setCheckOut, paymentStatus, paymentNumber, paymentId }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(${api}/cart?userId=${userId});
        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId, api]);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  // Updated handlePayment function
  const handlePayment = () => {
    setCalculateTotal(calculateTotal()); // Call the function to get total
    setCheckOut(() => handleCheckout); // Pass reference to function
    navigate('/Payment');
  };

  let username = sessionStorage.getItem("username");

  const [userInfo] = useState({
    username,
    paymentNumber,
    paymentStatus,
    paymentId,
  });

  const currentDate = new Date().toLocaleString();

  const orderData = {
    user: userInfo,
    date: formattedDate,
    totalAmount: calculateTotal(),
    cart: cart,
  };

  // Handle checkout process
  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      // Send order data to the API
      await fetch(`${api}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData), // Fix: No extra wrapping
      });

      // Clear cart from database
      for (const item of cart) {
        await fetch(`${api}/cart/${item.id}`, {
          method: 'DELETE',
        });
      }

      // Clear local state
      setCart([]);
      setSuccessMessage('Order placed successfully!');
    } catch (error) {
      console.error('Error during checkout:', error);
      setSuccessMessage('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price}
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ${calculateTotal()}</h3>

      <button onClick={handlePayment} disabled={loading || cart.length === 0}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Checkout;