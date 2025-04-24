import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";
import Box from "./boxes";

const WishlistPage = ({ filteredProducts }) => {
    const dispatch = useDispatch();
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const userId = localStorage.getItem("userId") || "guest";
    const wishlist = useSelector((state) => state.wishlist.items);
    const wishlistStatus = useSelector((state) => state.wishlist.status);
    const error = useSelector((state) => state.wishlist.error);

    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);

    // Memoized filtering function
    const filterWishlistProducts = useCallback(() => {
        return filteredProducts.filter((product) => 
            wishlist.some(wishlistId => wishlistId.toString() === product.id.toString())
        );
    }, [filteredProducts, wishlist]);

    useEffect(() => {
        if (wishlistStatus === 'succeeded' || filteredProducts.length > 0) {
            setWishlistProducts(filterWishlistProducts());
        }
    }, [filterWishlistProducts, wishlistStatus, filteredProducts]);

    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeFromWishlist({ productId, userId }));
    };

    if (wishlistStatus === 'loading') {
        return <div>Loading wishlist...</div>;
    }

    if (wishlistStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlistProducts.length === 0 ? (
                <p>No products in wishlist.</p>
            ) : (
                <Box
                    Mobject={wishlistProducts}
                    Dobject={wishlistProducts}
                    onRemove={handleRemoveFromWishlist} // Pass the remove handler to Box
                />
            )}
        </div>
    );
};

export default WishlistPage;