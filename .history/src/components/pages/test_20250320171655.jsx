mport { useState, useEffect } from "react";

const Like = ({ productId }) => {
  const [likes, setLikes] = useState(0);

  // Fetch the current likes from db.json
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch(http://localhost:5000/products/${productId});
      const product = await response.json();
      setLikes(product.likes);
    };

    fetchLikes();
  }, [productId]);

  // Function to increment likes
  const incrementLikes = async () => {
    const newLikes = likes + 1;

    await fetch(`${}/products/${productId}, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newLikes }),
    });

    setLikes(newLikes);
  };

  return (
    <div>
      <button onClick={incrementLikes}>Like ❤️ {likes}</button>
    </div>
  );
};

export default Like;