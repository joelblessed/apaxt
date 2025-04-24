import { useState, useEffect } from "react";

const Test = ({}) => {
  const [likes, setLikes] = useState(0);
const productId
 
  // Function to increment likes
  const incrementLikes = async () => {
    const newLikes = likes + 1;

    await fetch(`${api}/products/${productId}`, {
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

export default Test;