// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { ...state, cart: action.payload, loading: false };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const API_URL = "http://localhost:5000/cart"; // Adjust to your backend URL

  // Fetch Cart
  const fetchCart = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      dispatch({ type: "SUCCESS", payload: data.cart });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  // Add to Cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      dispatch({ type: "SUCCESS", payload: data.cart });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Merge Cart
  const mergeCart = async (localCart) => {
    try {
      const response = await fetch(`${API_URL}/merge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ localCart }),
      });

      const data = await response.json();
      dispatch({ type: "SUCCESS", payload: data.cart });
    } catch (error) {
      console.error("Error merging cart:", error);
      dispatch({ type: "ERROR", payload: "Failed to merge cart" });
    }
  };

  // Update Cart Item
  const updateCartItem = async (productId, action) => {
    try {
      const response = await fetch(`${API_URL}/${productId}/${action}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      dispatch({ type: "SUCCESS", payload: data.cart });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      dispatch({ type: "SUCCESS", payload: data.cart });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: "SUCCESS", payload: [] });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, mergeCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);