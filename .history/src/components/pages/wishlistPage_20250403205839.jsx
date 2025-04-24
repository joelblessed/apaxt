import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";

const WishlistPage = ({filteredProducts}) => {
    const dispatch = useDispatch();
    const [v,setV] =useState([])
    const [wishlistProducts,setWishlistProducts] = useState([])
    const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
    const wishlist  =  useSelector((state) => state.wishlist.items)
    .map((id) => id.toString()); // Convert each ID to string
 
const w = [6,9]
useEffect(()=>{
    const t = w.map((i)=> i.toString())
    set
})


    useEffect(() => {
        // Filter products in the frontend
        const filtered = filteredProducts.filter((product) => t.includes(product.id.toString()));
        setWishlistProducts(filtered);
    }, []); // Runs when products are fetched


    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlistProducts.length === 0 ? (
                <p>No products in wishlistProducts.</p>
            ) : (
                <ul>
                    {wishlistProducts.map((product,index) => (
                        <li key={index}>
                            {product.name}
                            <button onClick={() => dispatch(removeFromWishlist({  userId }))}>
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