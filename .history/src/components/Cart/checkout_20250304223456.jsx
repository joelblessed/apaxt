import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Styled components
const CheckoutContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 20px;
  width: 90%;
  max-width: 600px;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const TotalContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ddd;
  }
  &:hover {
    background-color: #0056b3;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 20px;
`;

const Checkout = ({ api, setCalculateTotal, setCheckOut, paymentStatus, paymentNumber, paymentId }) => {
  const cart = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const handlePayment = () => {
    setCalculateTotal(calculateTotal);
    navigate('/Payment');
    setCheckOut(handleCheckout());
  };

  const username = sessionStorage.getItem("username");
  const [userInfo, setUserInfo] = useState({
    username,
    paymentNumber,
    paymentStatus,
    paymentId,
  });
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  const orderData = {
    user: userInfo,
    date: formattedDate,
    totalAmount: cart.reduce((total, item) => total + item.quantity * item.price, 0),
    cart: cart,
  };

  // Handle checkout process
  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Simulate sending cart data to an API (replace with real checkout logic)
      await fetch(`${api}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderData }),
      });

      // Clear cart from database (assuming all items are checked out)
      for (const item of cart) {
        await fetch(`${api}/cart/${item.id}`, {
          method: 'DELETE',
        });
      }

      // Clear local state
      setSuccessMessage('Order placed successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error during checkout:', error);
      setErrorMessage('Checkout failed. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <h2>Checkout</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <CartList>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>${item.price}</span>
            </CartItem>
          ))}
        </CartList>
      )}

      <TotalContainer>
        <h3>Total</h3>
        <span>${calculateTotal()}</span>
      </TotalContainer>

      <Button onClick={handlePayment} disabled={loading || cart.length === 0}>
        {loading ? 'Processing...' : 'Proceed To Pay'}
      </Button>

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </CheckoutContainer>
  );
};

export default Checkout;