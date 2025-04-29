import { setCart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } from "./cartSlice";
import { api } from "./config";
import { useState, useEffect, useCallback, useMemo } from "react";


const API_URL = `${api}/cart`;
const userId = localStorage.getItem("userId")

// Helper function to handle API errors
const handleApiError = (error, action) => {
  console.error(`Error ${action}:`, error);
  throw error;
};


// Add to Cart Before Login (Saves in LocalStorage)
export const addToCartBeforeLogin = (product) => (dispatch, getState) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = localCart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += product.quantity || 1;
  } else {
    localCart.push({
      ...product,
      quantity: product.quantity || 1
    });
  }
  
  localStorage.setItem("cart", JSON.stringify(localCart));
  dispatch(setCart(localCart));
};

// Enhanced cart merging after login
export const loadCartAfterLogin = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];

  try {
    // 1. Get server cart
    const serverResponse = await fetch(API_URL, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!serverResponse.ok) {
      throw new Error("Failed to fetch server cart");
    }

    const serverData = await serverResponse.json();
    const serverCart = serverData.items || serverData.cart || [];

    // 2. Create merged cart with conflict resolution
    const mergedCart = [];
    const serverItemsMap = new Map(serverCart.map(item => [item.id, item]));

    // First add all server items
    serverCart.forEach(item => {
      mergedCart.push({
        ...item,
        source: 'server'
      });
    });

    // Then merge local items (only if they don't exist in server cart)
    localCart.forEach(localItem => {
      if (!serverItemsMap.has(localItem.id)) {
        mergedCart.push({
    product_id: localItem.id,
    quantity: localItem.quantity,
     source: 'local'
        });
      }
    });

console.log("local",mergedCart)
    // 3. Update Redux state
    dispatch(setCart(mergedCart));

    // 4. Sync merged cart to server if there were local items
    if (localCart.length > 0) {
      const mergeResponse = await fetch(`${API_URL}/merge`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ localCart: mergedCart }),
      });

      if (mergeResponse.ok) {
        // alert('merge successful');
        // localStorage.removeItem("cart");
      }else{
        alert("failed to merge");
        throw new Error("Failed to sync merged cart");
       
      };
    }

    // 5. Clear local storage only after successful sync
  

  } catch (error) {
    console.error("Cart merge error:", error);
    
    // Try to get the server cart again for fallback
    try {
      const fallbackResponse = await fetch(API_URL, {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        const serverItems = fallbackData.items || fallbackData.cart || [];
        dispatch(setCart(serverItems));
      } else {
        // If we can't get server cart, use local cart as fallback
        dispatch(setCart(localCart));
      }
    } catch (fallbackError) {
      console.error("Fallback cart load failed:", fallbackError);
      dispatch(setCart(localCart));
    }
  }
};

// Unified Add to Cart function
export const addToCartAPI = (product) => async (dispatch, getState) => {
  const token = localStorage.getItem("token");
  const { cart } = getState();

  if (!token) {
    return dispatch(addToCartBeforeLogin(product));
  }

  
  try {
    // Optimistic UI update
    const newItem = {
      ...product,
      quantity: product.quantity || 1
    };
    dispatch(addToCart(newItem));

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: product.quantity || 1
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }

    // Refresh from server to ensure consistency
    const updatedCart = await response.json();
    dispatch(setCart(updatedCart.items || updatedCart.cart));
  } catch (error) {
    handleApiError(error, "adding to cart");
    // Revert the optimistic update
    const currentCart = cart.items.filter(item => item.id !== product.id);
    dispatch(setCart(currentCart));
  }
};

// Enhanced Remove Item from Cart
export const removeFromCartAPI = (productId) => async (dispatch, getState) => {
  const token = localStorage.getItem("token");
  const { cart } = getState();

  if (!token) {
    const localCart = cart.items.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(localCart));
    return dispatch(setCart(localCart));
  }

  try {
    // Optimistic UI update
    const currentCart = cart.items.filter(item => item.id !== productId);
    dispatch(setCart(currentCart));

    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.ok) {
    //  alert("deleted successfuly")
    }else{
      throw new Error("Failed to remove from cart");
    }
  } catch (error) {
    handleApiError(error, "removing from cart");
    // Revert to previous cart state
    dispatch(setCart(cart.items));
  }
};

// Enhanced Quantity Update
export const updateCartItemQuantity = (productId, action) => async (dispatch, getState) => {
  const token = localStorage.getItem("token");
  const { cart } = getState();

  if (!token) {
    const localCart = cart.items.map(item => 
      item.id === productId ? { ...item} : item
    );
    localStorage.setItem("cart", JSON.stringify(localCart));
    return dispatch(setCart(localCart));
  }

  try {
    // Optimistic UI update
    const updatedCart = cart.items.map(item => {
      if (item.id === productId) {
        const newQty = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    dispatch(setCart(updatedCart));

    const response = await fetch(`${API_URL}/${productId}/${action}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.ok) {
    // alert("cartment success")
    }else{
      throw new Error("Failed to update quantity");
    }
  } catch (error) {
    handleApiError(error, "updating quantity");
    // Revert to previous cart state
    dispatch(setCart(cart.items));
  }
};

// Clear Cart with proper handling
export const clearCartAPI = () => async (dispatch, getState) => {
  const token = localStorage.getItem("token");
  const { cart } = getState();

  if (!token) {
    localStorage.removeItem("cart");
    return dispatch(clearCart());
  }

  try {
    // Optimistic UI update
    dispatch(clearCart());

    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }
  } catch (error) {
    handleApiError(error, "clearing cart");
    // Revert to previous cart state
    dispatch(setCart(cart.items));
  }
};