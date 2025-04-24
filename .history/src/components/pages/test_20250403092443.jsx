import { useState, useEffect } from 'react';
import { 
  fetchWishlist, 
  addToWishlist, 
  removeFromWishlist,
  syncWishlist
} from '../services/api';

export const useWishlist = (user) => {
  const [wishlist, setWishlist] = useState([]);
  const [deviceId] = useState(() => {
    return localStorage.getItem('deviceId') || `device_${Math.random().toString(36).substr(2, 9)};
  });

  useEffect(() => {
    localStorage.setItem('deviceId', deviceId);
  }, [deviceId]);

  useEffect(() => {
    const loadWishlist = async () => {
      if (user?.token) {
        const data = await fetchWishlist(user.token);
        setWishlist(data);
      }
    };
    loadWishlist();
  }, [user]);

  const toggleWishlistItem = async (productId) => {
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
      if (user?.token) {
        await removeFromWishlist(productId, user.token);
      }
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      if (user?.token) {
        await addToWishlist(productId, user.token);
      } else {
        await addToWishlist(productId, null, deviceId);
      }
      setWishlist([...wishlist, productId]);
    }
  };

  const syncWishlists = async () => {
    if (user?.token) {
      const guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
      if (guestWishlist.length > 0) {
        const { wishlist: mergedWishlist } = await syncWishlist(
          guestWishlist, 
          deviceId, 
          user.token
        );
        setWishlist(mergedWishlist);
        localStorage.removeItem('guestWishlist');
      }
    }
  };

  return { wishlist, toggleWishlistItem, syncWishlists, deviceId };
};