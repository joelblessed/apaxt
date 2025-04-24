import React, { useState, useEffect } from 'react';
import Payment from '../Payment/Payment';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Checkout = ({api, setCalculateTotal, setCheckOut, paymentStatus, paymentNumber, paymentId}) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

 
  // Fetch cart items from the mock database
  useEffect(() => {
    fetch(`${api}/cart`)
      .then(response => response.json())
      .then(data => setCart(data))
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const handlePayment =()=>{
    setCalculateTotal(calculateTotal);
    navigate('/Payment')
    setCheckOut(handleCheckout())
     
  }
  let username = sessionStorage.getItem("username");
  const [userInfo, setUserInfo] = useState({
    username,
    paymentNumber,
    paymentStatus,
    paymentId,
  });
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleString()
 
  const orderData ={
    user:userInfo,
    
    date:formattedDate,
    totalAmount:cart.reduce((total, item) => total + item.quantity * item.price, 0),
    cart:cart,
   

  }
  // Handle checkout process
  const handleCheckout = async () => {
    setLoading(true);
    try {
      
      // Simulate sending cart data to an API (replace with real checkout logic)
      await fetch(`${api}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({orderData}),
      });

      // Clear cart from database (assuming all items are checked out)
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