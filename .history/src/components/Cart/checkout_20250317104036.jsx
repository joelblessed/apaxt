import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { clearCart } from "../redux/cartSlice"; // Import cart clearing action

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

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const TotalAmount = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-top: 10px;
`;

const SelectBox = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const InputBox = styled.input`
  padding: 10px;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [shippingLocation, setShippingLocation] = useState("local");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isPickup, setIsPickup] = useState(false);

  useEffect(() => {
    calculateDeliveryDate();
  }, [shippingMethod]);

  // Calculate total price of items in the cart
  const calculateTotalAmount = () => 
    cart.reduce((total, item) => total + item.quantity * item.price, 0);

  // Calculate shipping fee based on weight & location
  const calculateShippingFee = () => {
    if (isPickup) return 0;
    if (calculateTotalAmount() >= 50000) return 0;

    const weightFactor = {
      local: { standard: 2, express: 3 },
      national: { standard: 4, express: 5 },
      international: { standard: 6, express: 7 },
    };

    const totalWeight = cart.reduce((total, item) => total + item.weight * item.quantity, 0);
    return weightFactor[shippingLocation][shippingMethod] * totalWeight;
  };

  // Calculate the estimated delivery date
  const calculateDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDays = shippingMethod === "express" ? 2 : 5;
    
    currentDate.setDate(currentDate.getDate() + deliveryDays);
    if (currentDate.getDay() === 6) currentDate.setDate(currentDate.getDate() + 2);
    if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() + 1);

    setDeliveryDate(currentDate.toLocaleDateString());
  };

  // Handle checkout
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderData = {
        user: user.id,
        date: new Date().toLocaleString(),
        totalAmount: calculateTotalAmount() + calculateShippingFee(),
        cart,
        shipping: { address, deliveryDate, isPickup },
      };

      // Send order data to the backend
      await fetch(${api}/orders, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      // Clear cart from backend
      await Promise.all(
        cart.map((item) => fetch(${api}/cart/${item.id}, { method: "DELETE" }))
      );

      // Update Redux store
      dispatch(clearCart());

      setSuccessMessage("Order placed successfully!");
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.error("Error during checkout:", error);
      setSuccessMessage("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <Title>Checkout</Title>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <CartList>
            {cart.map((item) => (
              <CartItem key={item.id}>
                {item.name} - {item.quantity} x ${item.price} - {item.weight}kg
              </CartItem>
            ))}
          </CartList>

          <TotalAmount>Total: ${calculateTotalAmount()}</TotalAmount>

          <label>Shipping Location:</label>
          <SelectBox value={shippingLocation} onChange={(e) => setShippingLocation(e.target.value)}>
            <option value="local">Local</option>
            <option value="national">National</option>
            <option value="international">International</option>
          </SelectBox>

          <label>Shipping Method:</label>
          <SelectBox value={shippingMethod} onChange={(e) => { setShippingMethod(e.target.value); calculateDeliveryDate(); }}>
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </SelectBox>

          <label>Delivery Address:</label>
          <InputBox type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />

          <label>Estimated Delivery Date:</label>
          <InputBox type="text" readOnly value={deliveryDate || "Select shipping method"} />

          <label>Self Pickup (Free Shipping):</label>
          <input type="checkbox" checked={isPickup} onChange={() => setIsPickup(!isPickup)} />

          <TotalAmount>Shipping Fee: ${calculateShippingFee()}</TotalAmount>
          <TotalAmount>Grand Total: ${calculateTotalAmount() + calculateShippingFee()}</TotalAmount>

          <Button onClick={handleCheckout} disabled={loading || cart.length === 0}>
            {loading ? "Processing..." : "Checkout"}
          </Button>

          {successMessage && <Message success={successMessage === "Order placed successfully!"}>{successMessage}</Message>}
        </>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;