import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import wishlistReducer from './features/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer
  }
});