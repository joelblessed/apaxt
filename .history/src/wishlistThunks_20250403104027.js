// features/wishlistThunks.js
import { 
    wishlistLoading,
    wishlistLoaded,
    guestWishlistLoaded,
    wishlistSyncComplete
  } from './wishlistSlice';
  import { api } from '../../app/api';
  
  export const fetchWishlist = () => async (dispatch, getState) => {
    dispatch(wishlistLoading());
    try {
      const token = getState().auth.token;
      if (token) {
        const response = await api.get('/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(wishlistLoaded(response.data));
      } else {
        const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
        dispatch(guestWishlistLoaded(guestWishlist));
      }
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    }
  };
  
  export const syncWishlist = () => async (dispatch, getState) => {
    const { token } = getState().auth;
    const guestWishlist = getState().wishlist.guestItems;
    
    if (token && guestWishlist.length > 0) {
      try {
        const response = await api.post('/wishlist/sync', 
          { productIds: guestWishlist },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(wishlistSyncComplete(response.data));
        localStorage.removeItem('guestWishlist');
      } catch (err) {
        console.error('Failed to sync wishlist:', err);
      }
    }
  };