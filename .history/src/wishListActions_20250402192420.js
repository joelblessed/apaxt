import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: JSON.parse(localStorage.getItem("wishlist")) || [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    addToWishlist: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((id) => id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;