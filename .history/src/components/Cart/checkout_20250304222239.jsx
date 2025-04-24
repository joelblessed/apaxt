import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../"; // Import Redux action

const Checkout = ({ api, setCalculateTotal, setCheckOut }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const userId = localStorage.getItem("userid");
  const username = sessionStorage.getItem("username");
  const paymentNumber = localStorage.getItem("paymentNumber");
  const paymentStatus = "Pending"; 
  const paymentId = Math.random().toString(36).substring(7); 

  const orderData = {
    userId,
    username,
    paymentNumber,
    paymentStatus,
    paymentId,
    date: new Date().toLocaleString(),
    totalAmount: calculateTotal(),
    cart,
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Send order to backend
      const response = await fetch(`${api}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to place order");

      // Clear Redux cart state
      dispatch(clearCart());

      setSuccessMessage('Order placed successfully!');
      setTimeout(() => navigate('/order-success'), 2000);
    } catch (error) {
      console.error('Checkout error:', error);
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

      <button onClick={handleCheckout} disabled={loading || cart.length === 0}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Checkout;