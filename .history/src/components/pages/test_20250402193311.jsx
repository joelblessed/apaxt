import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToWishlist, removeFromWishlist } from "../wishlistSlice";

// Styled button
const WishlistButton = styled.button`
  background-color: ${(props) => (props.remove ? "#f44336" : "#ff4081")};
  border: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
`;

const Test = ({ filteredProducts }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // Get wishlist from Redux store
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.includes(product.id);

  // Add to wishlist
  const addToWishlistHandler = async (productId) => {
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/wishlist/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
        const data = await response.json();
        alert(data.message);
        dispatch(addToWishlist(productId));
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  // Remove from wishlist
  const removeFromWishlistHandler = async (productId) => {
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/wishlist/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
        const data = await response.json();
        alert(data.message);
        dispatch(removeFromWishlist(productId));
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    } else {
      dispatch(removeFromWishlist(productId));
    }
  };

  return (
    <div>
      
        <img src={product.images[0]} alt={product.name} width="150" />
      )}
      <p>Price: CFA {product.price}</p>

      {isWishlisted ? (
        <WishlistButton remove onClick={() => removeFromWishlistHandler(product.id)}>
          Remove from Wishlist
        </WishlistButton>
      ) : (
        <WishlistButton onClick={() => addToWishlistHandler(product.id)}>
          Add to Wishlist
        </WishlistButton>
      )}
    </div>
  );
};

export default Test;