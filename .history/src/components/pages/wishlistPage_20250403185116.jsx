import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";
import Box from "./boxes"
const WishlistPage = ({filteredProducts}) => {
    const dispatch = useDispatch();
    const [wishlistProducts, setWishlistProducts] = useState([])
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    const wishlist = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        dispatch(fetchWishlist(userId));
    }, [dispatch, userId]);


  
//     <button onClick={() => dispatch(removeFromWishlist({ productId, userId }))}>
//     Remove
// </button>
    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlistProducts.length === 0 ? (
                <p>No products in wishlist.</p>
            ) : (
         <div>
        {wishlistProducts.map((product,index) =>(
            <div key={index}>
                {product.name}
            </div>
        ))}
         </div>
                
           
            )}
        </div>
    );
};

export default WishlistPage;