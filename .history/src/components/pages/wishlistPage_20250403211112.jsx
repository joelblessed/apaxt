import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";

const WishlistPage = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    const wishlist = useSelector((state) => state.wishlist.items);
const test = wishlist.map((productId)=>productId)
    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);

    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No products in wishlist.</p>
            ) : (
                <div>
                    {}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;