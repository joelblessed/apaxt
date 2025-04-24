import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { clearCart } from "../../cartSlice"; // Assuming you have a clearCart action

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

const CartDetails = styled.div`
  font-size: 1rem;
`;

const TotalAmount = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-top: 10px;
`;

const SelectBox = styled.select`
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
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

const Checkout = ({
  api,
  user,
  userId,
  setCalculateTotal,
  setCheckOut,
  paymentStatus,
  paymentNumber,
  paymentId,
}) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [shippingLocation, setShippingLocation] = useState("local"); // 'local', 'national', 'international'
  const [shippingMethod, setShippingMethod] = useState("standard"); // 'standard', 'express'
  const [address, setAddress] = useState(user.address);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isPickup, setIsPickup] = useState(false); // For self-pickup
  const [userInfo, setUserInfo] = useState({
    username: localStorage.getItem("username"),
    paymentNumber: paymentNumber,
    paymentStatus: paymentStatus,
    paymentId: paymentId,
  });

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Calculate delivery date when shipping method changes
  useEffect(() => {
    calculateDeliveryDate();
  }, [shippingMethod]);

  // Calculate total price of items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Calculate the shipping fee
  const calculateShippingFee = () => {
    const totalAmount = calculateTotalAmount();
    const totalWeight = cart.reduce(
      (total, item) => total + item.weight * item.quantity,
      0
    );

    // Free shipping for pickup
    if (isPickup) {
      return 0;
    }

    if (totalAmount >= 50000) {
      return 0; // Free shipping if total is over $50
    }

    if (shippingLocation === "local") {
      return shippingMethod === "standard" ? totalWeight * 2 : totalWeight * 3; // Different costs for standard/express
    }

    if (shippingLocation === "national") {
      return shippingMethod === "standard" ? totalWeight * 4 : totalWeight * 5; // Different costs for standard/express
    }

    if (shippingLocation === "international") {
      return shippingMethod === "standard" ? totalWeight * 6 : totalWeight * 7; // Different costs for standard/express
    }

    return 10; // Default shipping fee
  };

  // Calculate the total price with shipping fee
  const calculateTotalWithShipping = () => {
    return calculateTotalAmount() + calculateShippingFee();
  };

  // Calculate the estimated delivery date based on the selected shipping method
  const calculateDeliveryDate = () => {
    const currentDate = new Date();
    let deliveryDays = shippingMethod === "express" ? 2 : 5; // Express shipping: 2 days, Standard: 5 days

    // Add the delivery days to the current date
    currentDate.setDate(currentDate.getDate() + deliveryDays);

    // Check if the date falls on the weekend (Saturday/Sunday) and skip to Monday
    if (currentDate.getDay() === 6) {
      // Saturday
      currentDate.setDate(currentDate.getDate() + 2); // Skip to Monday
    } else if (currentDate.getDay() === 0) {
      // Sunday
      currentDate.setDate(currentDate.getDate() + 1); // Skip to Monday
    }

    setDeliveryDate(currentDate.toLocaleDateString()); // Format and set the delivery date
  };


 
  // Handle checkout process
  const handleCheckout = async () => {
    if (!address) {
      setSuccessMessage("Please enter a delivery address.");
      return;
    }

    if (!token) {
      setSuccessMessage("You must be logged in to place an order.");
      return;
    }

    setLoading(true);
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      const orderData = {
        user: userInfo,
        date: formattedDate,
        totalAmount: calculateTotalWithShipping(),
        cart: cart,
        shipping: {
          address,
          deliveryDate,
          isPickup,
        },
      };

      // Send order data to the backend with token-based authentication
      const response = await fetch(`${api}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify({ orderData }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }
      

      // Clear local state and show success message
      setSuccessMessage("Order placed successfully!");
      dispatch(clearCart()); // Clear cart from Redux store
      navigate("/dorders"); // Redirect to confirmation page
    } catch (error) {
      console.error("Error during checkout:", error);
      setSuccessMessage("Checkout failed. Please try again.");
    } finally {
      
      setLoading(false);
    }
    
  };


  const handleRewards = () => {

    fetch(`${api}/apply-reward", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Secure API call with JWT
      },
      body: JSON.stringify({ userId, amountPaid: calculateTotalWithShipping()})
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error("Error applying reward:", error));
  };

  };

  


  return (
    <CheckoutContainer>
      <Title>Checkout</Title>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <CartList>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <CartDetails>
                {item.name} - Quantity: {item.quantity} - Price: ${item.price} -
                Weight: {item.weight}kg
              </CartDetails>
            </CartItem>
          ))}
        </CartList>
      )}

      <TotalAmount>Total Amount: ${calculateTotalAmount()}</TotalAmount>

      <div>
        <label>Shipping Location:</label>
        <SelectBox
          onChange={(e) => setShippingLocation(e.target.value)}
          value={shippingLocation}
        >
          <option value="local">Local</option>
          <option value="national">National</option>
          <option value="international">International</option>
        </SelectBox>
      </div>

      <div>
        <label>Shipping Method:</label>
        <SelectBox
          onChange={(e) => {
            setShippingMethod(e.target.value);
            calculateDeliveryDate();
          }}
          value={shippingMethod}
        >
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </SelectBox>
      </div>

      <div>
        <label>Delivery Address:</label>
        <InputBox
          type="text"
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label>Estimated Delivery Date:</label>
        <InputBox
          type="text"
          readOnly
          value={deliveryDate || "Please select shipping method"}
        />
      </div>

      <div>
        <label>Self Pickup (Free Shipping):</label>
        <input
          type="checkbox"
          checked={isPickup}
          onChange={() => setIsPickup(!isPickup)}
        />
      </div>

      <TotalAmount>Shipping Fee: ${calculateShippingFee()}</TotalAmount>
      <TotalAmount>
        Total with Shipping: ${calculateTotalWithShipping()}
      </TotalAmount>

      <Button onClick={()=>{handleCheckout(); handleRewards()}} disabled={loading || cart.length === 0 || address ===""}>
        {loading ? "Processing..." : "Checkout"}
      </Button>

      {successMessage && (
        <Message success={successMessage === "Order placed successfully!"}>
          {successMessage}
        </Message>
      )}
      <button onClick={()=> handleRewards()}>test REward</button>
    </CheckoutContainer>
  );
};

export default Checkout;