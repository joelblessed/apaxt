import { useState, useEffect } from "react";

const Test = ({api,  filteredProducts  }) => {
  const [isInCart, setIsInCart] = useState(false);
const product = filteredProducts
  // Check if the product is in the cart from db.json
  useEffect(() => {
    fetch(`${api}/wishlist/${product.id}`)
      .then(res => res.json())
      .then(data => setIsInCart(data.length > 0));
  }, [product.id]);

  // Function to add/remove product from the cart
  const toggleCart = () => {
    if (isInCart) {
      fetch(`${api}/wishlist/${product.id}`, {
        method: "DELETE"
      }).then(() => setIsInCart(false));
    } else {
      fetch(`${api}/wishList, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      }).then(() => setIsInCart(true));
    }
  };

  return (
    <button
      onClick={toggleCart}
      style={{ backgroundColor: isInCart ? "green" : "yellow" }}
    >
      {isInCart ? "Added to Cart" : "Add to Cart"}
    </button>
  );
};

export default Test