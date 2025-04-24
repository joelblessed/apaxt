import React, { useState, useEffect } from "react";
import "./Products.css";

const Test= ({ addToCart, addToWishlist, toggleLike, likedProducts }) => {
  const [products, setProducts] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  // Fetch products (replace with real API call)
  useEffect(() => {
    // Simulate fetching products from an API
    setProducts([
      {
        id: 1,
        name: "Product 1",
        price: "$20",
        desc: "This is product 1",
        image: "https://via.placeholder.com/200",
      },
      {
        id: 2,
        name: "Product 2",
        price: "$25",
        desc: "This is product 2",
        image: "https://via.placeholder.com/200",
      },
      // Add more products
    ]);
  }, []);

  // Intersection Observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleItems((prev) => [...prev, entry.target]);
        }
      });
    }, { threshold: 0.3 });

    const boxes = document.querySelectorAll(".fade-box");
    boxes.forEach((box) => observer.observe(box));

    return () => {
      boxes.forEach((box) => observer.unobserve(box));
    };
  }, [products]);

  return (
    <div className="products-container">
      {products.map((product) => (
        <div
          key={product.id}
          className={`fade-box ${visibleItems.includes(product.id) ? "visible" : ""}}
          style={{
            opacity: visibleItems.includes(product.id) ? 1 : 0,
            transform: visibleItems.includes(product.id) ? "translateY(0)" : "translateY(50px)",
          }}
        >
          <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <h4>{product.price}</h4>

              {/* Like Button */}
              <button
                className={`like-btn ${likedProducts.includes(product.id) ? "liked" : ""}`}
                onClick={() => toggleLike(product)}
              >
                {likedProducts.includes(product.id) ? "Unlike" : "Like"}
              </button>

              {/* Add to Wishlist */}
              <button className="wishlist-btn" onClick={() => addToWishlist(product)}>
                Add to Wishlist
              </button>

              {/* Add to Cart */}
              <button className="cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Test