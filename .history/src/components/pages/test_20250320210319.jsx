import { useState, useEffect } from "react";

const Test = ({ api }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [api]);

  // Fetch likes & liked state when productId is set
  useEffect(() => {
    if (productId !== null) {
      const fetchProduct = async () => {
        const response = await fetch(`${api}/products/${productId}`);
        const product = await response.json();
        setLikes(product.likes);
        setLiked(product.liked); // Get liked status from the backend
      };

      fetchProduct();
    }
  }, [api, productId]);

  // Toggle like/dislike
  const toggleLike = async () => {
    if (productId === null) return;

    const endpoint = liked ? "dislike" : "like";
    const response = await fetch(`${api}/products/${productId}/${endpoint}, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setLikes(data.likes);
    setLiked(!liked); // Toggle liked state
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button onClick={() => {
              setProductId(product.id);
              setLiked(product.liked); // Set liked state from product
            }}>
              {product.name} (Likes: {product.likes})
            </button>
          </li>
        ))}
      </ul>

      {productId !== null && (
        <div>
          <h3>Selected Product ID: {productId}</h3>
          <button onClick={toggleLike}>
            {liked ? "Dislike 💔" : "Like ❤️"} {likes}
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;