import { useEffect, useState } from "react";

const WishList = ({ }) => {
  const [wishlist, setWishlist] = useState([]);

  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch(`http://localhost:5000/wishlist/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, [userId, token]);

  

  const handleDelete = async (productId) => {
    await removeFromWishlist(userId, productId);
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };


   // Define removeFromWishlist inside the component
   const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/wishlist/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await response.json();
      console.log("Deleted:", data);

      // Update state to remove the product
      setWishlist(wishlist.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
            <button onClick={() => handleDelete(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;