import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishListReducer"; // Import the reducer


const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});


const store = configureStore({
  reducer: {
    wishlist: wishlistReducer, // Add wishlist to Redux state
  },
});

export default store;