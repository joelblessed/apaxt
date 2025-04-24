import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../wishlistSlice";

import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import Box from "./boxes";

const Products = ({
  filteredProducts,
  SelectedProduct,
  highlightText,
  product
 
}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };
  
 
    const userId = localStorage.getItem("userId") || "guest";

    const wishlistArray = useSelector((state) => state.wishlist.items)
        .map((id) => id.toString());

    const isInWishlist = wishlistArray.includes(product.id.toString());

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist({ productId: product.id, userId }));
        } else {
            dispatch(addToWishlist({ productId: product.id, userId }));
        }
  return (
    <div>
      <div>
        <Box
          Mobject={filteredProducts}
          Dobject={filteredProducts}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
          handleWislistToggle={handleWislistToggle}
          isInWishlist={isInWishlist}
          
        />
      </div>
    </div>
  );
};

export default Products;
