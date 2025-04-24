import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";
import Box from "./boxes"

const WishlistPage = ({filteredProducts}) => {
    const dispatch = useDispatch();
    const [wishlistProducts,setWishlistProducts] = useState([])
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    const wishlist = useSelector((state) => state.wishlist.items);
const test = wishlist.map((productId)=>productId.toString())
    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);

    console.log(test)

    useEffect(() => {
        // Filter products in the frontend
        const filtered = filteredProducts.filter((product) => test.includes(product.id.toString()));
        setWishlistProducts(filtered);
    }, ); // Runs when products are fetched


    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No products in wishlist.</p>
            ) : (
                <div>
                  <Box
                            Mobject={filteredProducts}
                            Dobject={filteredProducts}
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;