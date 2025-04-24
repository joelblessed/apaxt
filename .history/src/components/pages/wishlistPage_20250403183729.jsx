import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";
import Box from "./boxes";

const WishlistPage = ({ filteredProducts }) => {
    const dispatch = useDispatch();
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const userId = localStorage.getItem("userId") || "guest";

    // Get wishlist from Redux store
    const wishlist = useSelector((state) => state.wishlist.items); // Assuming wishlist.items is an array of product IDs

    // Fetch wishlist from API
    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);

    // Filter products when wishlist or filteredProducts change
    useEffect(() => {
        if (filteredProducts.length > 0 && wishlist.length > 0) {
            const filtered = filteredProducts.filter((product) => wishlist.includes(product.id.toString()));
            setWishlistProducts(filtered);
        }
    }, [filteredProducts, wishlist]); // Include wishlist in dependencies

    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlistProducts.length === 0 ? (
                <p>No products in wishlist.</p>
            ) : (
                <Box Mobject={wishlistProducts} Dobject={wishlistProducts} />
            )}
        </div>
    );
};

export default WishlistPage;