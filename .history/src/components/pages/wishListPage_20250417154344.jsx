import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../wishlistSlice";
import Box from "./boxes";

const WishlistPage = ({ filteredProducts, highlightText }) => {
  const dispatch = useDispatch();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const userId = localStorage.getItem("userId") || "guest"; // Check if user is logged in
  const wishlist = useSelector((state) => state.wishlist.items);
  const WL = wishlist.map((productId) => productId.toString());
  useEffect(() => {
    dispatch(fetchWishlist(userId));
  }, [dispatch, userId]);

 

  useEffect(() => {
    // Filter products in the frontend
    const filtered = filteredProducts.filter((product) =>
      WL.includes(product.id.toString())
    );
    setWishlistProducts(filtered);
  },[wishlist]); // Runs when products are fetched

  return (
    <div>
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
         <CategoryBox
                    Mobject={products}
                    Dobject={Dobject}
                    Dobject1={Dobject1}
                    loaderRef={loaderRef}
                    SelectedProduct={SelectedProduct}
                    handleProductClick={handleProductClick}
                    highlightText={highlightText}
                  />
      )}
    </div>
  );
};

export default WishlistPage;
