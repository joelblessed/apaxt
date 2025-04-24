import { get, post, del } from '../utils/api';

// Generate or retrieve device ID
const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = `device_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

// Add to wishlist
export const addToWishlist = (productId) => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth.token;
  const deviceId = getDeviceId();

  if (token) {
    // Authenticated user
    await post('/account/wishlist', { productId }, token);
    dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
  } else {
    // Guest user
    const guestWishlist = [...(state.wishlist.guestItems || []), productId];
    localStorage.setItem('guestWishlist', JSON.stringify(guestWishlist));
    await post('/guest/wishlist', { deviceId, productId });
    dispatch({ type: 'UPDATE_GUEST_WISHLIST', payload: guestWishlist });
  }
};

// Remove from wishlist
export const removeFromWishlist = (productId) => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth.token;
  const deviceId = getDeviceId();

  if (token) {
    // Authenticated user
    await del(/account/wishlist/${productId}, {}, token);
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  } else {
    // Guest user
    const guestWishlist = (state.wishlist.guestItems || []).filter(id => id !== productId);
    localStorage.setItem('guestWishlist', JSON.stringify(guestWishlist));
    await del(/guest/wishlist/${productId}, { deviceId });
    dispatch({ type: 'UPDATE_GUEST_WISHLIST', payload: guestWishlist });
  }
};

// Sync wishlist after login
export const syncWishlist = () => async (dispatch, getState) => {
  const deviceId = getDeviceId();
  const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
  const token = getState().auth.token;

  if (guestWishlist.length > 0 && token) {
    await post('/account/wishlist/sync', { productIds: guestWishlist }, token);
    localStorage.removeItem('guestWishlist');
    await del(/guest/wishlist/clear, { deviceId });
  }

  // Refresh wishlist from server
  const { wishlist } = await get('/account/wishlist', {}, token);
  dispatch({ type: 'SYNC_WISHLIST', payload: wishlist });
};