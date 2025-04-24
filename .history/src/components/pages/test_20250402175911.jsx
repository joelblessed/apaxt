import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Styled button for wishlist action
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

const T = ({ products }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // Get wishlist from Redux store
  const wishlist = useSelector((state) => state.wishlist.items);

  // Function to add product to wishlist
  const addToWishlist = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer ${token},
        },
        body: JSON.stringify({ product }),
      });
      const data = await response.json();
      alert(data.message);
      dispatch({ type: "wishlist/add", payload: product });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Function to remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/wishlist/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer ${token},
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      alert(data.message);
      dispatch({ type: "wishlist/remove", payload: productId });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <>
      {products.map((product) => {
        const isWishlisted = wishlist.some((item) => item.id === product.id);
        return (
          <div key={product.id}>
            <h3>{product.name}</h3>
            {product.images?.length > 0 && (
              <img src={product.images[0]} alt={product.name} width="150" />
            )}
            <p>Price: CFA {product.price}</p>

            {isWishlisted ? (
              <WishlistButton remove onClick={() => removeFromWishlist(product.id)}>
                Remove from Wishlist
              </WishlistButton>
            ) : (
              <WishlistButton onClick={() => addToWishlist(product)}>
                Add to Wishlist
              </WishlistButton>
            )}
          </div>
        );
      })}
    </>
  );
};

export default T;