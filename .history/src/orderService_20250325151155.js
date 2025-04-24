import {api} from "./config";


const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const fetchAllOrders = async () => {
  const response = await fetch(`${api}/allOrders`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch orders');
  }
  
  return response.json();
};

export const fetchUserOrders = async (userId) => {
  const response = await fetch(`${api}/user/${userId}`, {
    headers: getAuthHeader()
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch user orders');
  }
  
  return response.json();
};

export const cancelOrder = async (orderId) => {
  const response = await fetch(`${API_URL}/${orderId}/cancel`, {
    method: 'PATCH',
    headers: getAuthHeader()
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to cancel order');
  }
  
  return response.json();
};

export const deliverOrder = async (orderId, deliveryDate) => {
  const response = await fetch(`${API_URL}/${orderId}/deliver`, {
    method: 'PATCH',
    headers: getAuthHeader(),
    body: JSON.stringify({ deliveryDate })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to mark order as delivered');
  }
  
  return response.json();
};