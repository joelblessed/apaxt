import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistReducer"; // Import the reducer

const wisstore = configureStore({
  reducer: {
    wishlist: wishlistReducer, // Add wishlist to Redux state
  },
});

export default store