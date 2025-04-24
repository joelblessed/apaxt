import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";


import authReducer from './authSlice';
import wishlistReducer from './wishlistSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;




