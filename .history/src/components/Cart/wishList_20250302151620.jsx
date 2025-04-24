import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishListBeforeLogin, loadWishListAfterLogin, removeFromWishListAPI, clearWishListOnLogout } from "../../wishlistAction";

const WishList = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const token = localStorage.getItem("token"); // Check if user is signed in

    // 1. Load cart from localStorage before login
    useEffect(() => {
        const storedW = JSON.parse(localStorage.getItem("WishList")) || [];
        if (!token && storedCart.length > 0) {
            dispatch({ type: "cart/setCart", payload: storedW }); // Manually dispatch to set cart state
        }
    }, [dispatch, token]);

    // 2. Load cart from server after login
    useEffect(() => {
        if (token) {
            dispatch(loadWishListAfterLogin()); // Merge local and server cart
        }
    }, [dispatch, token]);

    // Add to WishList (Before Login)
    const handleAddToCart = (product) => {
        dispatch(addToWishListBeforeLogin(product));
    };

    // Remove Item from WishList
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromWishListAPI(productId));
    };

    // Clear WishList on Logout
    const handleClearCart = () => {
        dispatch(clearWishListOnLogout());
    };

    return (
        <div>
            <h2>Shopping WishList</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleClearCart}>Clear WishList</button>
        </div>
    );
};

export default WishList;