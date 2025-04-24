import { setCart, addToCart, removeFromCart, clearCart } from "./cartSlice";

const API_URL = "http://localhost:3000/cart";

// *🔹 Add to Cart Before Login (Saves in LocalStorage)*
export const addToCartBeforeLogin = (product) => (dispatch, getState) => {
    dispatch(addToCart(product));
    let localCart = JSON.parse(localStorage.getItem("cart")) || [];
    localCart.push(product);
    localStorage.setItem("cart", JSON.stringify(localCart));
};

// *🔹 Load Cart After Login (Merge Local with Server)*
export const loadCartAfterLogin = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    let localCart = JSON.parse(localStorage.getItem("cart")) || [];

    try {
        // Fetch user cart from the server
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "Authorization": Bearer ${token} },
        });

        let userCart = response.ok ? await response.json() : { cart: [] };

        // *Merge Local Cart & Server Cart (Remove Duplicates)*
        const mergedCart = [
            ...new Map([...localCart, ...userCart.cart].map(item => [item.id, item])).values()
        ];

        dispatch(setCart(mergedCart));

        // *Save merged cart to the server*
        await fetch(${API_URL}/merge, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": Bearer ${token}
            },
            body: JSON.stringify({ cart: mergedCart }),
        });

        // *Clear local cart after merging*
        localStorage.removeItem("cart");

    } catch (error) {
        console.error("Error fetching cart:", error);
    }
};

// *🔹 Add to Cart After Login*
export const addToCartAPI = (product) => async (dispatch) => {
    const token = localStorage.getItem("token");

    dispatch(addToCart(product));

    try {
        // Add product to the server cart after login
        await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": Bearer ${token}
            },
            body: JSON.stringify({ product }),
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

// *🔹 Remove Item from Cart*
export const removeFromCartAPI = (productId) => async (dispatch, getState) => {
    const token = localStorage.getItem("token");

    dispatch(removeFromCart(productId));

    try {
        // Remove item from server cart
        await fetch(${API_URL}/${productId}, {
            method: "DELETE",
            headers: { "Authorization": Bearer ${token} },
        });
    } catch (error) {
        console.error("Error removing product from cart:", error);
    }
};

// *🔹 Clear Cart (Logout)*
export const clearCartOnLogout = () => async (dispatch) => {
    const token = localStorage.getItem("token");

    dispatch(clearCart());

    try {
        // Clear cart from the server on logout
        await fetch(API_URL, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
};