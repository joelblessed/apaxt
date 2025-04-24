import { setCart, addToCart, removeFromCart, clearCart } from "./cartSlice";

const API_URL = "http://localhost:3001/cart";

// *Add to Cart Before Login (Saves in LocalStorage)*
export const addToCartBeforeLogin = (product) => (dispatch, getState) => {
    dispatch(addToCart(product));
    localStorage.setItem("cart", JSON.stringify(getState().cart.items));
};

// *Load Cart After Login (Merge Local with Server)*
export const loadCartAfterLogin = () => async (dispatch) => {
    let localCart = JSON.parse(localStorage.getItem("cart")) || [];

    try {
        const response = await fetch(`${API_URL}/${}`);
        let userCart = response.ok ? await response.json() : { cart: [] };

        // Merge Local Cart & User Cart (Remove Duplicates)
        const mergedCart = [...new Map([...localCart, ...userCart.cart].map(item => [item.id, item])).values()];

        dispatch(setCart(mergedCart));

        // Save merged cart to the server
        await fetch(`${API_URL}/${}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: mergedCart }),
        });

        // Clear local cart after merging
        localStorage.removeItem("cart");
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
};

// *Remove Item from Cart*
export const removeFromCartAPI = (productId, ) => async (dispatch, getState) => {
    dispatch(removeFromCart(productId));

    // Update the server
    await fetch(`${API_URL}/${}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: getState().cart.items }),
    });
};

// *Clear Cart (Logout)*
export const clearCartOnLogout = () => (dispatch) => {
    dispatch(clearCart());
};