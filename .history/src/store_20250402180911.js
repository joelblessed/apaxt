import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishistReducer"; // Import the reducer


const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;