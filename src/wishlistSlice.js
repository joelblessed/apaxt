import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./config";

// Fetch Wishlist from API
export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (userId) => {
    const response = await fetch(`${api}/wishlist/${userId}`);
    return response.json();
});

// Add to Wishlist
export const addToWishlist = createAsyncThunk("addToWishlist", async ({ productId, userId }) => {
    await fetch(`${api}/addToWishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId }),
    });
    // if (response.ok){
    //     alert("added successfuly")
    // }else{
    //     alert("erro wl")
    // }
    return productId;
});

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk("removeFromWishlist", async ({ productId, userId }) => {
    await fetch(`${api}/removeFromWishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId }),
    });
    return productId;
});

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { items: [], status: "idle" },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = state.items.filter((id) => id !== action.payload);
            });
    },
});

export default wishlistSlice.reducer;