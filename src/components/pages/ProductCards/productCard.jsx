import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="product-image"
        />
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">${product.price}</p>
        {!product.number_in_stock && (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;