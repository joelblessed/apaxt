import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";

const WishlistPage = () => {
    const dispatch = useDispatch();
    co
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    const wishlist = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        fetch("http://localhost:5000/products/filter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wishlist }),
        })
            .then((res) => res.json())
            .then((data) => setFilteredProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No products in wishlist.</p>
            ) : (
                <ul>
                    {wishlist.map((productId) => (
                        <li key={productId}>
                            Product ID: {productId}
                            <button onClick={() => dispatch(removeFromWishlist({ productId, userId }))}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WishlistPage;