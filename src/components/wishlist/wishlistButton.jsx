import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../wishlistSlice";
import DesktopCards from "../ProductCards/desktopCards";
import Box from "../ProductCards/boxes";

const WishlistButton = ({ product, highlightText }) => {

  useEffect(() => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('sessionId', sessionId);
    }
  }, []);

  const dispatch = useDispatch();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const userId = localStorage.getItem("userId")|| null; 
  const sessionId = localStorage.getItem('sessionId');
  const wishlist = useSelector((state) => state.wishlist.items);
  const [WishlistArray, setWishlistArray] = useState([]) 


 useEffect(()=>{
  if (wishlist.length>0){
    const wlArray = wishlist.map((productId) => productId.toString());
    setWishlistArray(wlArray)
  }
 }, [userId])
  useEffect(() => {
    dispatch(fetchWishlist(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    // Filter products in the frontend
    const filtered = WishlistArray.includes(product.id.toString());

    setWishlistProducts(filtered);
  }, [wishlist]); // Runs when products are fetched

  const isInWishList = WishlistArray.includes(product.id.toString());
  const handleWishlistToggle = () => {
    if (isInWishList) {
      dispatch(removeFromWishlist({ productId: product.id, userId, sessionId}));
      dispatch(fetchWishlist(userId));
    } else {
      dispatch(addToWishlist({ productId: product.id, userId , sessionId}));
      dispatch(fetchWishlist(userId));

    }
  };

  useEffect(() => {
    const button = document.querySelector(`#wishlist-button-${product.id}`);
    const handleTouchEnd = (e) => {
      e.preventDefault();
      handleWishlistToggle();
    };

    if (button) {
      button.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (button) {
        button.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isInWishList, product.id, userId, dispatch]);



  return (
    <div >
      <button
        id={`wishlist-button-${product.id}`}
        onClick={ handleWishlistToggle}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          // fontWeight:'bold',
          fontSize: "25px",
          background:"none",
          color:  isInWishList ? "red" : "blue",
       
        }}
      >
        {isInWishList ? "[-]" : "[+]"}
      </button>
    </div>
  );
};

export default WishlistButton;
