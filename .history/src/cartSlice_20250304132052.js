import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage =()=>{
    const storedCart = loadCartFromStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : []
}
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
            localStorage.setItem("cart", JSON.stringify(state.items)); // Save to localStorage
        },
        addToCart: (state, action) => {
            state.items.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items)); // Save to localStorage
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            // localStorage.removeItem("cart");
        }
    }});

