import { useState, useEffect } from "react";

const Test = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);

  // Check if the product is in the cart from db.json
  useEffect(() => {
    fetch(`http://localhost:3000/cart?id=${product.id}`)
      .then(res => res.json())
      .then(data => setIsInCart(data.length > 0));
  }, [product.id]);

 

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