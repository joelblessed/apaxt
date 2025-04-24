import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";

const WishlistPage = ({filteredProducts}) => {
    const dispatch = useDispatch();
    const [wishlistProducts, setWishlistProducts] = useState([])
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    const wishlist = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);


    useEffect(() => {
        // Filter products in the frontend
        const filtered = filteredProducts.filter((product) => wishlist.includes(product.id.toString()));
        setWishlistProducts(filtered);
    }, [allProducts]); // Runs when products are fetched

//     <button onClick={() => dispatch(removeFromWishlist({ productId, userId }))}>
//     Remove
// </button>
    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlistProducts.length === 0 ? (
                <p>No products in wishlist.</p>
            ) : (
                <Box
                Mobject={wishlistProducts}
                Dobject={wish}
                selectedDProduct={selectedProduct}
                toggleLike={toggleLike}
                show={show}
                handleProductClick={handleProductClick}
                handleProductHid={handleProductHid}
                addToWishlist={addToWishlist}
                isMobile={isMobile}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                showDetails={showDetails}
                position={position}
                Iposition={Iposition}
                fontSize={fontSize}
                IfontSize={IfontSize}
                highlightText={highlightText}
              />
            )}
        </div>
    );
};

export default WishlistPage;