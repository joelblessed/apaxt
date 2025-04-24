import { useEffect, useState } from 'react';
import { 
  addToWishlist as apiAddToWishlist,
  removeFromWishlist as apiRemoveFromWishlist,
  fetchWishlist as apiFetchWishlist,
  syncWishlist as apiSyncWishlist
} from './wishListApi';

export const useWishlist = (user) => {
  const [wishlist, setWishlist] = useState([]);
  const [deviceId] = useState(() => {
    return localStorage.getItem('deviceId') || `device_${Math.random().toString(36).substr(2, 9)}`;
  });

  // Initialize device ID
  useEffect(() => {
    localStorage.setItem('deviceId', deviceId);
  }, [deviceId]);

  // Load wishlist on mount
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (user?.token) {
          const data = await apiFetchWishlist(user.token);
          setWishlist(data);
        } else {
          const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
          setWishlist(guestWishlist);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    };

    loadWishlist();
  }, [user]);

  // Toggle wishlist item
  const toggleWishlistItem = async (productId) => {
    const isInWishlist = wishlist.includes(productId);
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter(id => id !== productId);
      if (user?.token) {
        await apiRemoveFromWishlist(productId, user.token);
      } else {
        localStorage.setItem('guestWishlist', JSON.stringify(updatedWishlist));
      }
    } else {
      updatedWishlist = [...wishlist, productId];
      if (user?.token) {
        await apiAddToWishlist(productId, user.token);
      } else {
        localStorage.setItem('guestWishlist', JSON.stringify(updatedWishlist));
      }
    }

    setWishlist(updatedWishlist);
  };

  // Sync wishlist after login
  const syncWishlist = async () => {
    if (user?.token) {
      const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
      if (guestWishlist.length > 0) {
        await apiSyncWishlist(guestWishlist, deviceId, user.token);
        localStorage.removeItem('guestWishlist');
        const data = await apiFetchWishlist(user.token);
        setWishlist(data);
      }
    }
  };

  return { wishlist, toggleWishlistItem, syncWishlist, deviceId };
};