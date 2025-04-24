import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishListBeforeLogin, loadWishListAfterLogin, removeFromWishListAPI, clearWishListOnLogout } from "../../wishlistAction";

const WishList = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.items);
    const token = localStorage.getItem("token"); // Check if user is signed in

    // 1. Load wishlist from localStorage before login
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (!token && storedCart.length > 0) {
            dispatch({ type: "wishlist/setCart", payload: storedCart }); // Manually dispatch to set wishlist state
        }
    }, [dispatch, token]);

    // 2. Load wishlist from server after login
    useEffect(() => {
        if (token) {
            dispatch(loadWishListAfterLogin()); // Merge local and server wishlist
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
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                <ul>
                    {wishlist.map((item) => (
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