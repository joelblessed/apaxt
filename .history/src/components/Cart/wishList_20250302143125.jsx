import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setWishList,
  addToWishList,
  removeFromWishList,
  clearWishList,
} from "../../wishlistActionAction";

const WishList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("token"); // Check if user is signed in

  // 1. Load cart from localStorage before login
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("WishList")) || [];
    if (!token && storedCart.length > 0) {
      dispatch({ type: "cart/setCart", payload: storedCart }); // Manually dispatch to set cart state
    }
  }, [dispatch, token]);

  // 2. Load cart from server after login
  useEffect(() => {
    if (token) {
      dispatch(loadCartAfterLogin()); // Merge local and server cart
    }
  }, [dispatch, token]);

  // Add to Cart (Before Login)
  const handleAddToCart = (product) => {
    dispatch(addToWishListBeforeLogin(product));
  };

  // Remove Item from Cart
  const handleRemoveFromC = (productId) => {
    dispatch(removeFromCartAPI(productId));
  };

  // Clear Cart on Logout
  const handleClearCart = () => {
    dispatch(clearCartOnLogout());
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default WishList;
