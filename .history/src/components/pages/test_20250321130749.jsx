import React, { useState } from "react";

const Test = ({ api }) => {
  const [expandedProductId, setExpandedProductId] = useState(null);
const [products, setProducts]
  const togglePreview = (id) => {
    // Toggle the preview: if the clicked product is already expanded, collapse it.
    setExpandedProductId((prevId) => (prevId === id ? null : id));
  };
    // Fetch all products
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch(`${api}/products`);
        const data = await response.json();
        setProducts(data);
      };
      fetchProducts();
    }, [api]);

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <div
            onClick={() => togglePreview(product.id)}
            style={{ cursor: "pointer" }}
          >
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
          {expandedProductId === product.id && (
            <div
              style={{
                marginTop: "10px",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <h4>Product Preview</h4>
              <p>{product.description}</p>
              {/* You can add additional details as needed */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Test;