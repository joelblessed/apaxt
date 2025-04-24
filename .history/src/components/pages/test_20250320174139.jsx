import { useState, useEffect } from "react";

const Test = ({ api }) => {
  const [likes, setLikes] = useState(0);
 const productId = 34354
  // Fetch the current likes from the backend
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch(`${api}/products/${productId}`);
      const product = await response.json();
      setLikes(product.likes);
    };

    fetchLikes();
  }, [productId]);

  // Function to increment likes
  const incrementLikes = async () => {
    const response = await fetch(`${api}/products/${productId}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setLikes(data.likes);
  };

  return (
    <div>
      <button onClick={incrementLikes}>like ❤️ {likes}</button>
    </div>
  );
};

export default Test;