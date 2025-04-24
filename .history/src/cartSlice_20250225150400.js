import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set the entire cart (used when loading the cart from localStorage or backend)
    setCart: (state, action) => {
      state.items = action.payload;
    },

    // Add a product to the cart
    addToCart: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        // If product exists in cart, increase quantity
        state.items[existingProductIndex].quantity += 1;
      } else {
        // If product doesn't exist in cart, add it with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove a product from the cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Increment the quantity of a product in the cart
    incrementQuantity: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (existingProductIndex >= 0) {
        state.items[existingProductIndex].quantity += 1;
      }
    },

    // Decrement the quantity of a product in the cart
    decrementQuantity: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (existingProductIndex >= 0) {
        const currentQuantity = state.items[existingProductIndex].quantity;
        if (currentQuantity > 1) {
          state.items[existingProductIndex].quantity -= 1;
        } else {
          state.items.splice(existingProductIndex, 1); // Remove item if quantity is 1
        }
      }
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer