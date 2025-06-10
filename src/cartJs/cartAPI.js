import { Meta } from "react-router-dom";
import { api } from "../config";
export const fetchCart = async (token) => {
  const response = await fetch(`${api}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch cart");
  return await response.json();
};

export const addToCart = async (product, token) => {
  const response = await fetch(`${api}/cart`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_product_id: product.user_products[0].id ,
      quantity: 1,
      price_at_added:product.user_products[0].price,
      discount_at_added:product.user_products[0].discount,
      metadata: {},
    }),
  });
  if (!response.ok) throw new Error("Failed to add to cart");
  return await response.json();
};

export const updateCartItem = async (productId, action, token) => {
  const response = await fetch(`${api}/cart/${productId}/${action}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(`Failed to ${action} item quantity`);
  return await response.json();
};

export const removeFromCart = async (productId, token) => {
  const response = await fetch(`${api}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to remove from cart");
  return await response.json();
};

export const mergeCarts = async (localCart, token) => {
  const response = await fetch(`${api}/cart/merge`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ localCart: localCart }),
  });
  if (!response.ok) throw new Error("Failed to merge carts");
  return await response.json();
};

//   const response = await fetch(`${api}/cart/merge`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       localCart: localCart.map(item => ({
//         product_id: item.product_id, // or item.id depending on your structure
//         quantity: item.quantity
//       }))
//     })
//   });

//   if (!response.ok) throw new Error('Failed to merge carts');
//   return await response.json();
// };

export const clearCart = async (token) => {
  const response = await fetch(`${api}/cart`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to clear cart");
  return await response.json();
};
