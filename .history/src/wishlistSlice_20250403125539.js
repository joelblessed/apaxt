import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Wishlist from API
export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (userId) => {
    const response = await fetch(`http://localhost:5000/wishlist/${userId}`);
    return response.json();
});

// Add to Wishlist
export const addToWishlist = createAsyncThunk("wishlist/add", async ({ productId, userId }) => {
    await fetch("http://localhost:5000/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId }),
    });
    return productId;
});

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk("wishlist/remove", async ({ productId, userId }) => {
    await fetch("http://localhost:5000/wishlist/remove", {
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