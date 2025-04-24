import React from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/wishlistSlice";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId") || "guest"; // Check user login

    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToWishlist({ productId: product.id, userId }))}>
                Add to Wishlist
            </button>
        </div>
    );
};

export default ProductCard;