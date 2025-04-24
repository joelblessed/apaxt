const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(${API_URL}/products?${query});
  return await response.json();
};

export const fetchWishlist = async (token) => {
  const response = await fetch(`${API_URL}/wishlist, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

export const addToWishlist = async (productId, token, deviceId) => {
  if (token) {
    await fetch(`${API_URL}/wishlist/${productId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } else {
    await fetch(`${API_URL}/guest/wishlist/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ deviceId })
    });
  }
};

export const syncWishlist = async (productIds, deviceId, token) => {
  const response = await fetch(`${API_URL}/wishlist/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productIds, deviceId })
  });
  return await response.json();
};