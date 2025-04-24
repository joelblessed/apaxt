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
      fetch(`${api}/wishlist`, {
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

const syncCartAfterLogin = async (userId) => {
  let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

  if (guestCart.length > 0) {
    // Fetch user's cart from the database
    let userCart = await fetch(`${api}/addToCart/${userId}`).then(res => res.json());

    // Merge guest cart with user cart (avoid duplicates)
    let mergedCart = [...userCart, ...guestCart.filter(gc => !userCart.find(uc => uc.id === gc.id))];

    // Save merged cart to database
    await fetch(`${api}/addToCart/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mergedCart)
    });

    // Clear guest cart from localStorage
    localStorage.removeItem("guestCart");
  }
}
\
