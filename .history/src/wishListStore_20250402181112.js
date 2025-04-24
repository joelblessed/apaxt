import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishListReducer"; // Import the reducer

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer, // Add wishlist to Redux state
  },
});

export default store;