import React, { createContext, use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
const [product, setProducts] = useState(localStorage.getItem("cart"))
const [cartItems, setCart] = useState([])
const user = useSelector((state) => state.user); // Check if user is signed in
const [isInCart, setIsInCart] = useState(false);
const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
 

  useEffect(() => {
    // Check if item is already in cart (for local storage)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setIsInCart(cart.some((item) => item.id === product.id));
  }, []);


  useEffect(() => {
    // Check if item is already in cart (for local storage)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    setQuantity(existingItem ? existingItem.quantity : 0);
  }, []);

    // Decrement quantity function
    const handleIncrement = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id === product.id);
    
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          setQuantity((prevQuantity) => prevQuantity + 1);
        } else {
          HandleRemoveFromCart(); // Remove item if quantity reaches 0
        }
      };
    
 
  // Decrement quantity function
  const handleDecrement = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      HandleRemoveFromCart(); // Remove item if quantity reaches 0
    }
  };

  // Remove from cart function
  const HandleRemoveFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setQuantity(0);
  };
  // Remove from cart function
  const handleRemoveFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsInCart(false);
  };

  return (
    <div style={{marginTop:" 90px"}}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>Cart is empty</p> : 
        cartItems.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
          </div>
        ))
      }
    </div>
  );
};

export default Cart