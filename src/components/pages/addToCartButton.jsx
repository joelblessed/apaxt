import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartWithAuth,
  mergeCartsAfterLogin,
} from "../../cartJs/cartThunks";
import { AddtocartButton, MAddtocartButton } from "./styledComponents";

const AddToCartButton = ({ product }) => {
  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cart);
  const [isMobile, setIsMobile] = useState(false);
  const token = localStorage.getItem("token");
  const localCart = localStorage.getItem("cart");

  const handleAddToCart = () => {
    dispatch(addToCartWithAuth(product));
  };

  return (
    <>
      {isMobile ? (
        <div
          onClick={handleAddToCart}
          disabled={loading}
          main={product.discount < 1}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </div>
      ) : (
        <div
          onClick={handleAddToCart}
          disabled={loading}
          main={product.discount < 1}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </div>
      )}
    </>
  );
};

export default AddToCartButton;
