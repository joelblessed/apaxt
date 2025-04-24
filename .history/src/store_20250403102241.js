import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";


import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import wishlistReducer from './wishlistSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer
  },
});

export default store;





export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer
  }
});