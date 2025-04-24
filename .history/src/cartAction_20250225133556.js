import { setCart, addToCart, removeFromCart, clearCart } from "./cartSlice";

const API_URL = "http://localhost:3001/cart";

// *🔹 Add to Cart (Before Login - Save to LocalStorage)*
export const addToCartBeforeLogin = (product) => (dispatch, getState) => {
    dispatch(addToCart(product));

    let localCart = JSON.parse(localStorage.getItem("cart")) || [];
    localCart.push(product);
    localStorage.setItem("cart", JSON.stringify(localCart));
};

// *🔹 Load Cart After Login (Merge Local & Server)*
export const loadCartAfterLogin = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let localCart = JSON.parse(localStorage.getItem("cart")) || [];

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch cart");

        let userCart = await response.json();

        // *Merge Local Cart & Server Cart (Avoid Duplicates)*
        const mergedCart = [
            ...new Map([...localCart, ...userCart.cart].map(item => [item.id, item])).values()
        ];

        dispatch(setCart(mergedCart));

        // *Save Merged Cart to Server*
        await fetch(`${API_URL}/merge`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ mergedCart }),
        });

        localStorage.removeItem("cart"); // *Clear Local Cart after Sync*
    } catch (error) {
        console.error("Error loading cart:", error);
    }
};

// *🔹 Add to Cart (After Login - Update Server)*
export const addToCartAPI = (product) => async (dispatch) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        // If user is not logged in, save locally
        return addToCartBeforeLogin(product)(dispatch);
    }

    dispatch(addToCart(product));

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}
            },
            body: JSON.stringify({ product }),
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};