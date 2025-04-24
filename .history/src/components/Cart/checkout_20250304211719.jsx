import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ api }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentNumber, setPaymentNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Fetch auth token
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${api}/cart?userId=${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Attach token for authentication
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (userId && token) fetchCart();
  }, [userId, token, api]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const handlePayment = async () => {
    if (!paymentNumber) {
      setError("Enter your MTN MoMo number");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Simulate MTN MoMo API request
      const paymentResponse = await fetch(`${api}/mtn-momo-payment`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: calculateTotal(),
          phoneNumber: paymentNumber,
        }),
      });

      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok) throw new Error(paymentData.message || "Payment failed");

      setPaymentStatus("Payment successful");

      // Save order
      const orderData = {
        userId,
        paymentNumber,
        date: new Date().toISOString(),
        totalAmount: calculateTotal(),
        cart,
      };

      await fetch(`${api}/orders`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      // Clear cart from database
      for (const item of cart) {
        await fetch(`${api}/cart/${item.id}, {
          method: "DELETE",
          headers: {
            "Authorization": Bearer ${token},
          },
        });
      }

      setCart([]);
      navigate("/order-success"); // Redirect to success page

    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {paymentStatus && <p style={{ color: "green" }}>{paymentStatus}</p>}

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

      <label>
        Enter MTN MoMo Number:
        <input
          type="text"
          value={paymentNumber}
          onChange={(e) => setPaymentNumber(e.target.value)}
          placeholder="e.g. 2567XXXXXXX"
        />
      </label>

      <button onClick={handlePayment} disabled={loading || cart.length === 0}>
        {loading ? "Processing..." : "Pay with MTN MoMo"}
      </button>
    </div>
  );
};

export default Checkout;