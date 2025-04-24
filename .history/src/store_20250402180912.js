import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishListReducer"; // Import the reducer


const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;