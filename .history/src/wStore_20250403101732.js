import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import wishlistReducer from './wishlistSlice';

export const wstore = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer
  }
});