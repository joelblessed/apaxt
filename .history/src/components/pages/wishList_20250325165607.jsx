import { useEffect, useState } from "react";

const Wishlist = ({ userId, token }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch(http://localhost:5000/wishlist/${userId}, {
      headers: { Authorization: Bearer ${token} },
    })
      .then((res) => res.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, [userId, token]);

  const handleAddToCart = async (productId) => {
    await removeFromWishlist(userId, productId, token);
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;