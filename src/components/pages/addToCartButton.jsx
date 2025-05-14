import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartWithAuth } from '../../cartJs/cartThunks';

const AddToCartButton = ({ product }) => {
     
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.cart);
  
  const handleAddToCart = () => {
    dispatch(addToCartWithAuth({ 
      id: product.id,
      product_id: product.id,
      name: product.name,
      price: product.price,
   
      quantity:1
    }));
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="btn btn-primary w-full"
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;