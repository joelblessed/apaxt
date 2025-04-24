import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishListReducer"; // Import the reducer

const wstore = configureStore({
  reducer: {
    wishlist: wishlistReducer, // Add wishlist to Redux state
  },
});

export default store;