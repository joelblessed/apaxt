import React, { useEffect, useStat } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";

const WishlistPage = () => {
    const dispatch = useDispatch();
    const [wishlistProducts, setWishlistProducts] = useState([])
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    const wishlist = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);


    useEffect(() => {
        // Filter products in the frontend
        const filtered = allProducts.filter((product) => productIds.includes(product.id.toString()));
        setFilteredProducts(filtered);
    }, [allProducts]); // Runs when products are fetched


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