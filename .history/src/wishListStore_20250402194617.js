import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishistReducer"; // Import the reducer

const wishliststore = configureStore({
  reducer: {
    wishlist: wishlistReducer, // Add wishlist to Redux state
  },
});

export default wishliststore