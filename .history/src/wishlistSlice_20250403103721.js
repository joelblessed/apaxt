// features/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],        // For authenticated users
  guestItems: [],   // For guest users
  status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    wishlistLoading: (state) => {
      state.status = 'loading';
    },
    wishlistLoaded: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    guestWishlistLoaded: (state, action) => {
      state.guestItems = action.payload;
    },
    itemAdded: (state, action) => {
      const productId = action.payload;
      if (state.items.includes(productId)) return;
      state.items.push(productId);
    },
    itemRemoved: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(id => id !== productId);
    },
    guestItemAdded: (state, action) => {
      const productId = action.payload;
      if (state.guestItems.includes(productId)) return;
      state.guestItems.push(productId);
    },
    guestItemRemoved: (state, action) => {
      const productId = action.payload;
      state.guestItems = state.guestItems.filter(id => id !== productId);
    },
    wishlistSyncComplete: (state, action) => {
      state.items = action.payload;
      state.guestItems = [];
    }
  }
});

export const {
  wishlistLoading,
  wishlistLoaded,
  guestWishlistLoaded,
  itemAdded,
  itemRemoved,
  guestItemAdded,
  guestItemRemoved,
  wishlistSyncComplete
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectGuestWishlistItems = (state) => state.wishlist.guestItems;
export const selectWishlistStatus = (state) => state.wishlist.status;
export const selectWishlistError = (state) => state.wishlist.error;

export default wishlistSlice.reducer;