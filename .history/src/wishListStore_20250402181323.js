import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishListReducer"; // Import the reducer

const wlstore = configureStore({
  reducer: {
    wishlist: wishlistReducer, // Add wishlist to Redux state
  },
});

export default wlstore;