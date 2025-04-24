// Helper function to get device ID
const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

// Toggle wishlist item
export const toggleWishlistItem = (productId) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');
  const deviceId = getDeviceId();
  
  if (token) {
    // Logged-in user - update account.json
    const user = getState().auth.user;
    const isInWishlist = user.wishlist.includes(productId);
    
    const method = isInWishlist ? 'DELETE' : 'POST';
    await fetch(`/api/wishlist/${productId}`, {
      method,
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    dispatch({
      type: 'TOGGLE_WISHLIST',
      payload: { productId, isAdding: !isInWishlist }
    });
  } else {
    // Guest user - update local storage and guestWishlists
    const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
    const isInWishlist = guestWishlist.includes(productId);
    
    const updatedWishlist = isInWishlist
      ? guestWishlist.filter(id => id !== productId)
      : [...guestWishlist, productId];
    
    localStorage.setItem('guestWishlist', JSON.stringify(updatedWishlist));
    
    // Update guestWishlists in account.json (mock API call)
    await fetch('/api/guest-wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, productId, action: isInWishlist ? 'remove' : 'add' })
    });
    
    dispatch({
      type: 'UPDATE_GUEST_WISHLIST',
      payload: updatedWishlist
    });
  }
};

// Sync wishlist after login
export const syncWishlist = () => async (dispatch, getState) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  const deviceId = getDeviceId();
  const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
  
  if (guestWishlist.length > 0) {
    // Merge guest wishlist with user account
    await fetch('/api/wishlist/sync', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productIds: guestWishlist })
    });
    
    // Clear guest wishlist
    localStorage.removeItem('guestWishlist');
    await fetch('/api/guest-wishlist/clear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId })
    });
  }
  
  // Load user's updated wishlist
  const res = await fetch('/api/wishlist', {
    headers: { 'Authorization': `Bearer ${token} }
  });
  const { wishlist } = await res.json();
  
  dispatch({
    type: 'SYNC_WISHLIST',
    payload: wishlist
  });
};