const API_BASE = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await fetch(${API_BASE}/products);
  return await response.json();
};

export const fetchWishlist = async (token) => {
  const response = await fetch(${API_BASE}/wishlist, {
    headers: { 'Authorization': Bearer ${token} }
  });
  return await response.json();
};

export const addToWishlist = async (productId, token) => {
  await fetch(${API_BASE}/wishlist/${productId}, {
    method: 'POST',
    headers: { 'Authorization': Bearer ${token} }
  });
};

export const removeFromWishlist = async (productId, token) => {
  await fetch(`${API_BASE}/wishlist/${productId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const syncWishlist = async (productIds, deviceId, token) => {
  await fetch(${API_BASE}/wishlist/sync, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productIds, deviceId })
  });
};