// *Increment Product Quantity*
export const incrementProductQuantity = (productId) => (dispatch, getState) => {
    dispatch(incrementQuantity(productId));

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

// *Remove Product from Cart*
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
