import React, { useState } from "react";

const  = ({ products }) => {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const togglePreview = (id) => {
    // Toggle the preview: if the clicked product is already expanded, collapse it.
    setExpandedProductId((prevId) => (prevId === id ? null : id));
  };

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

export default ;