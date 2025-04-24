

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ api }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(""); // User's MTN Mobile Money number
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  // Fetch user's cart by token
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${api}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
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
  }, [token, api]);

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  // Handle MTN Mobile Money payment
  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid MTN Mobile Money number.");
      return;
    }

    setLoading(true);
    try {
      // Simulate MTN Mobile Money payment
      const paymentResponse = await fetch(`${api}/payments/mtn-mobile-money`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber,
          amount: calculateTotal(),
        }),
      });

      if (!paymentResponse.ok) throw new Error("Payment failed. Please try again.");

      const paymentData = await paymentResponse.json();
      console.log("Payment successful:", paymentData);

      // Proceed to checkout after successful payment
      await handleCheckout(paymentData.transactionId);
    } catch (err) {
      console.error("Error during payment:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle checkout process
  const handleCheckout = async (transactionId) => {
    try {
      const orderData = {
        user: {
          username: sessionStorage.getItem("username"),
        },
        date: new Date().toLocaleString(),
        totalAmount: calculateTotal(),
        cart: cart,
        paymentMethod: "MTN Mobile Money",
        transactionId,
      };

      // Submit order to the backend
      const orderResponse = await fetch(`${api}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token},
        },
        body: JSON.stringify({ orderData }),
      });

      if (!orderResponse.ok) throw new Error("Failed to place order");

      // Clear cart from database
      for (const item of cart) {
        await fetch(${api}/cart/${item.id}, {
          method: "DELETE",
          headers: {
            Authorization: Bearer ${token},
          },
        });
      }

      // Clear local state
      setCart([]);
      setSuccessMessage("Order placed successfully!");
    } catch (err) {
      console.error("Error during checkout:", err);
      setError("Checkout failed. Please try again.");
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

      {/* MTN Mobile Money Payment Form */}
      <div>
        <label htmlFor="phoneNumber">MTN Mobile Money Number:</label>
        <input
          type="text"
          id="phoneNumber"
          placeholder="Enter your MTN Mobile Money number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <button onClick={handlePayment} disabled={loading || cart.length === 0}>
        {loading ? "Processing..." : "Pay with MTN Mobile Money"}
      </button>

      {successMessage && <p>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Checkout;