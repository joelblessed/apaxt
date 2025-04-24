import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Checkout = ({ api, setCalculateTotal, paymentStatus, paymentNumber, paymentId }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${api}/cart`, {
          headers: {
            Authorization:`Bearer ${token}, // Include the token in the request headers
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCart();
    } else {
      setError("User not authenticated. Please log in.");
    }
  }, [token, api]); // Include token and api in the dependency array

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Navigate to payment page
      setCalculateTotal(calculateTotal());
      navigate('/Payment');

      // Handle checkout process
      await handleCheckout();
    } catch (err) {
      console.error('Error during payment:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const username = sessionStorage.getItem("username");
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  const orderData = {
    user: {
      username,
      paymentNumber,
      paymentStatus,
      paymentId,
    },
    date: formattedDate,
    totalAmount: calculateTotal(),
    cart: cart,
  };

  // Handle checkout process
  const handleCheckout = async () => {
    try {
      // Simulate sending cart data to an API (replace with real checkout logic)
      const orderResponse = await fetch(${api}/orders, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Bearer ${token}, // Include the token in the request headers
        },
        body: JSON.stringify({ orderData }),
      });

      if (!orderResponse.ok) throw new Error('Failed to place order');

      // Clear cart from database (assuming all items are checked out)
      for (const item of cart) {
        const deleteResponse = await fetch(${api}/cart/${item.id}, {
          method: 'DELETE',
          headers: {
            Authorization: Bearer ${token}, // Include the token in the request headers
          },
        });

        if (!deleteResponse.ok) throw new Error('Failed to clear cart');
      }

      // Clear local state
      setCart([]);
      setSuccessMessage('Order placed successfully!');
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Checkout failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Checkout;