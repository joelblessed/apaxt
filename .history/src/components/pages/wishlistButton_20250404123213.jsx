import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist,addToWishlist, removeFromWishlist } from "../../wishlistSlice";
import DesktopCards from "./ProductCards/desktopCards";
import Box from "./boxes";

const WishlistButton = ({ product, highlightText }) => {
  const dispatch = useDispatch();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
  const wishlist = useSelector((state) => state.wishlist.items);
  const WishlistArray = wishlist.map((productId) => productId.toString());
  const ts = "test";
  useEffect(() => {
    dispatch(fetchWishlist(userId));
  }, [dispatch, userId]);
console.log(produ)
  useEffect(() => {
    // Filter products in the frontend
    const filtered = 
      WishlistArray.includes(product.id.toString())
    
    setWishlistProducts(filtered);
  }, [wishlist]); // Runs when products are fetched

  const isInWishList = WishlistArray.includes(product.id.toString())
 const handleWishlistToggle =()=>{
  if(isInWishList){
    dispatch(removeFromWishlist({productId: product.id, userId}))
  }
  else{
    dispatch(addToWishlist({productId: product.id, userId}))

  }
 }
  return (
    <div>
      
      <button onClick={handleWishlistToggle}>{isInWishList ? "Remove":"Add"}</button>
      
    </div>
  );
};

export default WishlistButton;
