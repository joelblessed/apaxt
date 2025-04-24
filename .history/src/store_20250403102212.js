import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;





export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer
  }
});