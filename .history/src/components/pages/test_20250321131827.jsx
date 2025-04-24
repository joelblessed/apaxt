import React, { useState } from "react";

// The preview component that changes its layout based on a prop
const ProductPreview = ({ product, layout }) => {
  if (!product) return null;

  // Detailed layout: includes additional information and different styling
  if (layout === "detailed") {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#e0f7fa",
          border: "1px solid #00acc1",
          borderRadius: "4px",
          marginTop: "10px",
        }}
      >
        <h3>
          {product.name} <span style={{ fontSize: "0.8em" }}>(Detailed View)</span>
        </h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        {product.additionalInfo && <p>Info: {product.additionalInfo}</p>}
      </div>
    );
  }

  // Default layout: simpler view
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginTop: "10px",
      }}
    >
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

const Test = ({ filteredP }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewLayout, setPreviewLayout] = useState("default");

  const togglePreviewLayout = () => {
    setPreviewLayout((prev) => (prev === "default" ? "detailed" : "default"));
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Product List Section */}
      <div style={{ flex: "1" }}>
        <h2>Product List</h2>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor:
                selectedProduct && selectedProduct.id === product.id
                  ? "#e0e0e0"
                  : "#fff",
            }}
          >
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div style={{ flex: "1" }}>
        <h2>Product Preview</h2>
        {selectedProduct ? (
          <>
            <ProductPreview product={selectedProduct} layout={previewLayout} />
            <button
              onClick={togglePreviewLayout}
              style={{
                marginTop: "10px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Toggle Preview Layout
            </button>
          </>
        ) : (
          <p>Please select a product to preview.</p>
        )}
      </div>
    </div>
  );
};

export default Test;