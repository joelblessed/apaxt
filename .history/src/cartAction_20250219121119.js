export const addToCart = (product) => {
    return (dispatch, getState) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: product,
        });

        // Save cart to localStorage before login
        localStorage.setItem("cart", JSON.stringify(getState().cart.items));
    };
};

export const loadCartAfterLogin = (userId) => {
    return async (dispatch) => {
        let localCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Fetch user's cart from db.json
        const response = await fetch(`http://localhost:5000/carts/${userId}`);
        const userCart = response.ok ? await response.json() : { cart: [] };

        // Merge local cart and user cart (avoid duplicates)
        const mergedCart = [...new Map([...localCart, ...userCart.cart].map(item => [item.id, item])).values()];

        dispatch({
            type: "SET_CART",
            payload: mergedCart,
        });

        // Save merged cart to db.json
        await fetch(`http://localhost:3000/carts/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: mergedCart }),
        });

        // Clear localStorage after merging
        localStorage.removeItem("cart");
    };
};