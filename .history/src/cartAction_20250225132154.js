import { setCart, addToCart, removeFromCart, clearCart } from "./cartSlice";

const API_URL = "http://localhost:3001/cart";

// *Save Cart to Local Storage*
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// *Get Token from Local Storage*
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { "Authorization": `Bearer ${token} }` : {};
};

// *Add to Cart Before Login (Save in LocalStorage)*
export const addToCartBeforeLogin = (product) => (dispatch, getState) => {
    dispatch(addToCart(product));
    saveCartToLocalStorage(getState().cart.items);
};

// *Load Cart After Login & Merge with Server*
export const loadCartAfterLogin = () => async (dispatch) => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    try {
        const response = await fetch(API_URL, { 
            method: "GET", 
            headers: { ...getAuthHeaders() } 
        });

        const serverCart = response.ok ? await response.json() : { cart: [] };

        // Merge Local Cart & Server Cart (Remove Duplicates)
        const mergedCart = [...new Map([...localCart, ...serverCart.cart].map(item => [item.id, item])).values()];

        dispatch(setCart(mergedCart));

        // Save merged cart to server
        await fetch(${API_URL}/merge, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
                ...getAuthHeaders()
            },
            body: JSON.stringify({ cart: mergedCart }),
        });

        // Clear local cart after merging
        localStorage.removeItem("cart");
    } catch (error) {
        console.error("Error loading cart:", error);
    }
};

// *Add to Cart After Login (Updates Server)*
export const addToCartAPI = (product) => async (dispatch, getState) => {
    dispatch(addToCart(product));
    saveCartToLocalStorage(getState().cart.items);

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify({ product }),
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

// *Remove Item from Cart*
export const removeFromCartAPI = (productId) => async (dispatch, getState) => {
    dispatch(removeFromCart(productId));
    saveCartToLocalStorage(getState().cart.items);

    try {
        await fetch(${API_URL}/${productId}, {
            method: "DELETE",
            headers: { ...getAuthHeaders() },
        });
    } catch (error) {
        console.error("Error removing product from cart:", error);
    }
};

// *Clear Cart on Logout*
export const clearCartOnLogout = () => async (dispatch) => {
    dispatch(clearCart());
    localStorage.removeItem("cart");

    try {
        await fetch(API_URL, {
            method: "DELETE",
            headers: { ...getAuthHeaders() },
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
};