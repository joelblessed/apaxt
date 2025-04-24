import React from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../wishlistSlice";

const Test = ({ filteredProducts }) => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId") || "guest"; // Check user login

    return (
        <div className="product-card">
          {filteredProducts.map((product)=>{
            <div>

            </div>
          })}
           
        </div>
    );
};

export default Test;