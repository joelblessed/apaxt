import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartWithAuth,
  mergeCartsAfterLogin,
} from "../../cartJs/cartThunks";
import { AddtocartButton, MAddtocartButton } from "../support/styledComponents";

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
  const [addingId, setAddingId] = useState(null);

const handleAddToCart = () => {
  setAddingId(product.id);
  dispatch(addToCartWithAuth(product)).finally(() => setAddingId(null));
};

  return (
    <>
      {isMobile ? (
      <div
        onClick={handleAddToCart}
        disabled={loading && addingId === product.id}
        main={product.discount < 1}
      >
        {loading && addingId === product.id ? "Adding..." : "Add to Cart"}
      </div>
    ) : (
      <div
        onClick={handleAddToCart}
        disabled={loading && addingId === product.id}
        main={product.discount < 1}
      >
        {loading && addingId === product.id ? "Adding..." : "Add to Cart"}
      </div>
    )}
    </>
  );
};

export default AddToCartButton;
