import { createSlice } from '@reduxjs/toolkit';

const getInitialWishlist = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  }
  return [];
};

const initialState = {
  items: getInitialWishlist(),
  status: 'idle',
  error: null
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    setWishlist: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    resetWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlist');
    }
  }
});

export const { addItem, removeItem, setWishlist, resetWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (productId) => (state) => 
  state.wishlist.items.includes(productId);

export default wishlistSlice.reducer;