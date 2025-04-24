import { setCart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } from "./cartSlice";

const API_URL = "http://localhost:3000/cart";

// *Add to Cart Before Login (Save in LocalStorage)*
export const addToCartBeforeLogin = (product) => (dispatch, getState) => {
    dispatch(addToCart(product));

    let localCart = JSON.parse(localStorage.getItem("cart")) || [];
    localCart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(localCart));
};

// *Add to Cart After Login (Save to Server & Redux)*
export const addToCartAfterLogin = (product) => async (dispatch) => {
    const token = localStorage.getItem("token");

    // Update Redux state
    dispatch(addToCart(product));

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ product }),
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

// *Load Cart After Login (Merge Local with Server)*
export const loadCartAfterLogin = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    let localCart = JSON.parse(localStorage.getItem("cart")) || [];

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });

        let userCart = response.ok ? await response.json() : { cart: [] };

        // Merge Local Cart & Server Cart (Remove Duplicates)
        const mergedCart = [
            ...new Map([...localCart, ...userCart.cart].map(item => [item.id, item])).values()
        ];

        dispatch(setCart(mergedCart));

        // Save merged cart to the server
        await fetch(${API_URL}/merge, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ cart: mergedCart }),
        });

        // Clear local cart after merging
        localStorage.removeItem("cart");

    } catch (error) {
        console.error("Error fetching cart:", error);
    }
};

// *Increment Product Quantity*
export const incrementProductQuantity = (productId) => (dispatch, getState) => {
    dispatch(incrementQuantity(productId));

    const updatedCart = getState().cart.items;
    const token = localStorage.getItem("token");

    try {
        fetch(${API_URL}/${productId}, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ cart: updatedCart }),
        });
    } catch (error) {
        console.error("Error incrementing product quantity:", error);
    }
};

// *Decrement Product Quantity*
export const decrementProductQuantity = (productId) => (dispatch, getState) => {
    dispatch(decrementQuantity(productId));

    const updatedCart = getState().cart.items;
    const token = localStorage.getItem("token");

    try {
        fetch(`${API_URL}/${productId}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ cart: updatedCart }),
        });
    } catch (error) {
        console.error("Error decrementing product quantity:", error);
    }
};

// *Remove Product from Cart (Before and After Login)*
export const removeProductFromCart = (productId) => async (dispatch, getState) => {
    dispatch(removeFromCart(productId));

    const updatedCart = getState().cart.items;
    const token = localStorage.getItem("token");

    try {
        await fetch(`${API_URL}/${productId}`, {
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${token}`
            },
        });

        // Save updated cart on server
        await fetch(API_URL, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ cart: updatedCart }),
        });

    } catch (error) {
        console.error("Error removing product from cart:", error);
    }
};

// *Clear Cart on Logout (Before and After Login)*
export const clearCartOnLogout = () => async (dispatch) => {
    const token = localStorage.getItem("token");

    dispatch(clearCart());

    try {
        await fetch(API_URL, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
}