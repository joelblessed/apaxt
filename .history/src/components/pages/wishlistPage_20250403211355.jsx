import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";

const WishlistPage = ({filteredProducts}) => {
    const dispatch = useDispatch();
    const [wishlistProducts]
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    const wishlist = useSelector((state) => state.wishlist.items);
const test = wishlist.map((productId)=>productId)
    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        // Filter products in the frontend
        const filtered = filteredProducts.filter((product) => test.includes(product.id.toString()));
        setWishlistProducts(filtered);
    }, []); // Runs when products are fetched


    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No products in wishlist.</p>
            ) : (
                <div>
                    {test}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;