import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Wishlist from API
export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (userId) => {
    const response = await fetch(`http://localhost:5000/wishlist/${userId}`);
    return  JSON.stringify(res);
});

// Add to Wishlist
export const addToWishlist = createAsyncThunk("addToWishlist", async ({ productId, userId }) => {
    await fetch("http://localhost:5000/addToWishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId }),
    });
    return productId;
});

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk("removeFromWishlist", async ({ productId, userId }) => {
    await fetch("http://localhost:5000/removeFromWishlist", {
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