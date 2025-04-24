import { SET_USER_PRODUCTS, UPDATE_PRODUCT } from "./types";

const API_URL = "http://localhost:5000/products";

// Fetch user's products
export const fetchUserProducts = (userId) => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/products/user/${userId}`);
        const data = await response.json();
        dispatch({ type: SET_USER_PRODUCTS, payload: data });
    } catch (error) {
        console.error("Error fetching user products:", error);
    }
};

// Update product details
export const updateProduct = (product) => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/products/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (!response.ok) throw new Error("Failed to update product");

        const updatedProduct = await response.json();
        dispatch({ type: UPDATE_PRODUCT, payload: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
    }
}