// import { useState, useEffect } from "react";

// const Test = ({ api }) => {
//   const [likes, setLikes] = useState(0);
//   const [liked, setLiked] = useState(false); // Track if the user liked the product
//   const productId = 34354;

//   // Fetch the current likes from the backend
//   useEffect(() => {
//     const fetchLikes = async () => {
//       const response = await fetch(`${api}/products/${productId}`);
//       const product = await response.json();
//       setLikes(product.likes);
//     };

//     fetchLikes();
//   }, [api, productId]);

//   // Toggle like/dislike
//   const toggleLike = async () => {
//     const endpoint = liked ? "dislike" : "like"; // Choose API endpoint
//     const response = await fetch(`${api}/products/${productId}/${endpoint}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();
//     setLikes(data.likes);
//     setLiked(!liked); // Toggle liked state
//   };

//   return (
//     <div>
//       <button onClick={toggleLike}>
//         {liked ? "Dislike 💔" : "Like ❤️"} {likes}
//       </button>
//     </div>
//   );
// };

// export default Test;