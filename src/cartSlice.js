
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setCartError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setCart(state, action) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addItemToCart(state, action) {
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter(item => item.product_id !== action.payload);
    },
    updateItemQuantity(state, action) {
      const { product_id, quantity } = action.payload;
      const item = state.items.find(item => item.product_id === product_id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  setCartLoading,
  setCartError,
  setCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;