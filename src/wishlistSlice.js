import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./config";

// FETCH WISHLIST
export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (userId) => {
    if (!userId) {
        throw new Error("User ID is required to fetch wishlist");
    }
    const response = await fetch(`${api}/wishlist/${userId}`);
    const data = await response.json();
    return data || []; // Return data directly, default to an empty array
});

// ADD TO WISHLIST
export const addToWishlist = createAsyncThunk("wishlist/add", async ({ productId, userId, sessionId }) => {
    const response = await fetch(`${api}/wishlist/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, user_id: userId, session_id: sessionId }),
    });
    const data = await response.json();
    if (!data.item) {
        alert("Failed to add to wishlist");
        throw new Error("Failed to add to wishlist");
     
    }
    return data.item; // full item object
});

// REMOVE FROM WISHLIST
export const removeFromWishlist = createAsyncThunk("wishlist/remove", async ({ productId, userId, }) => {
    await fetch(`${api}/removeFromWishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId, }),
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
                state.items = action.payload || []; // Ensure state.items is always an array
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                if (!state.items.find(item => item.product_id === action.payload.product_id)) {
                    state.items.push(action.payload);
                }
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.product_id !== action.payload);
            });
    },
});

export default wishlistSlice.reducer;