import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";
import Box from "./boxes";
import { v4 as uuidv4 } from 'uuid';


const WishlistPage = ({ filteredProducts, api, highlightText }) => {


    useEffect(() => {
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('sessionId', sessionId);
      }
    }, []);


  const dispatch = useDispatch();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const userId = localStorage.getItem("userId") || localStorage.getItem('sessionId') ; // Ensure userId is a string
  const wishlist = useSelector((state) => state.wishlist.items);
  const WL = wishlist.length > 0 ? wishlist.map((productId) => productId.toString()) : [];

  useEffect(() => {
    if (userId.trim()) { // Validate userId is not empty or invalid
      dispatch(fetchWishlist(userId));
    } else {
      console.error("User ID is missing or invalid.");
    }
  }, [dispatch, userId]);

  // console.log("wishlist", wishlist)

  useEffect(() => {
    // Filter products in the frontend
    const filtered = filteredProducts.filter((product) =>
      WL.includes(product.id.toString())
    );
    setWishlistProducts(filtered);
  }); // Runs when products are fetched

  return (
    <div>
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <div>
          <Box Mobject={wishlistProducts} Dobject={wishlistProducts} highlightText={highlightText}/>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
