import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  addToCartBeforeLogin, 
  loadCartAfterLogin, 
  removeFromCartAPI, 
  clearCartOnLogout, 
  incrementProductQuantity, 
  decrementProductQuantity 
} from "../../cartAction";
import { useNavigate, Link } from "react-router-dom";
import "./cart.css"; // Import the CSS file

const Cart = ({ api, highlightText, searchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("token"); // Check if user is signed in
console.log(localStorage.getItem("cart"))
  // 1. Load cart from localStorage before login
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
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

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <h1 className="cart-empty-message">No items in the cart</h1>
      ) : (
        <div className="cart-items-container">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <div className="cart-item-content">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="cart-item-image"
                  />
                ) : (
                  <p>No image available</p>
                )}
                <div className="cart-item-details">
                  <div className="cart-item-description">{product.desc}</div>
                  <div className="cart-item-name">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightText(product.name, searchTerm),
                      }}
                    ></span>
                  </div>
                  <div className="cart-item-price">Price: CFA {product.price}</div>
                  <div className="cart-item-quantity-controls">
                    <div className="cart-item-quantity">{product.quantity}</div>
                    <button
                      className="cart-item-button"
                      onClick={() => dispatch(incrementProductQuantity(product.id))}
                      disabled={product.quantity >= product.numberInStock}
                    >
                      +
                    </button>
                    <button
                      className="cart-item-button"
                      onClick={() => dispatch(decrementProductQuantity(product.id))}
                      disabled={product.quantity <=1}
                    >
                      -
                    </button>
                    <button
                      className="cart-item-delete-button"
                      onClick={() => dispatch(removeFromCartAPI(product.id))}
                     
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link to="/checkout" className="cart-checkout-button">
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;