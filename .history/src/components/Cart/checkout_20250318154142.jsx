mport React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { clearCart } from "../../cartSlice";

// Styled components
const CheckoutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333;
`;

const InputBox = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:disabled {
    background-color: #dcdcdc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${(props) => (props.success ? "green" : "red")};
  font-size: 1.2rem;
  margin-top: 20px;
`;

const Checkout = ({ api }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const calculateTotalWeight = () => {
    return cart.reduce((total, item) => total + item.weight * item.quantity, 0);
  };

  const calculateShippingFee = () => {
    const weight = calculateTotalWeight();
    return distance * weight * 0.5; // Example formula: $0.5 per km per kg
  };

  const calculateTotalWithShipping = () => {
    return calculateTotalAmount() + calculateShippingFee();
  };

  const calculateDeliveryDate = () => {
    const currentDate = new Date();
    const estimatedDays = distance > 100 ? 5 : 3;
    currentDate.setDate(currentDate.getDate() + estimatedDays);
    setDeliveryDate(currentDate.toLocaleDateString());
  };

  const fetchDistance = async () => {
    if (!address) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=YourWarehouseAddress&destinations=${encodeURIComponent(
          address
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      const dist = data.rows[0].elements[0].distance.value / 1000; // Convert meters to km
      setDistance(dist);
      calculateDeliveryDate();
    } catch (error) {
      console.error("Error fetching distance:", error);
    }
  };

  useEffect(() => {
    if (address) fetchDistance();
  }, [address]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderData = {
        user: localStorage.getItem("username"),
        cart,
        address,
        distance,
        deliveryDate,
        totalAmount: calculateTotalWithShipping(),
      };

      const response = await fetch(${api}/orders, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to place order.");

      setSuccessMessage("Order placed successfully!");
      dispatch(clearCart());
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Checkout error:", error);
      setSuccessMessage("Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <Title>Checkout</Title>

      <div>
        <label>Delivery Address:</label>
        <InputBox
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label>Estimated Delivery Distance:</label>
        <InputBox type="text" readOnly value={distance ? ${distance} km : "Calculating..."} />
      </div>

      <div>
        <label>Estimated Delivery Date:</label>
        <InputBox type="text" readOnly value={deliveryDate || "Calculating..."} />
      </div>

      <div>
        <label>Shipping Fee:</label>
        <InputBox type="text" readOnly value={`$${calculateShippingFee().toFixed(2)}`} />
      </div>

      <div>
        <label>Total Amount (with Shipping):</label>
        <InputBox type="text" readOnly value={`$${calculateTotalWithShipping().toFixed(2)}`} />
      </div>

      <Button onClick={handleCheckout} disabled={loading || !address}>
        {loading ? "Processing..." : "Pay & Checkout"}
      </Button>

      {successMessage && <Message success={successMessage === "Order placed successfully!"}>{successMessage}</Message>}
    </CheckoutContainer>
  );
};

export default Checkout;