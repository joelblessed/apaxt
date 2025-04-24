import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectIsInWishlist ,   itemAdded, 
    itemRemoved,
    guestItemAdded,
    guestItemRemoved,
    selectWishlistItems,
    selectGuestWishlistItems } from '../../wishlistSlice';
import styled from 'styled-components';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(itemRemoved(product.id));
      console.log('Removed from wishlist:', product.id);
    } else {
      dispatch(Item(product.id));
      console.log('Added to wishlist:', product.id);
    }
  };

  return (
    <Card>
      <ProductImage src={product.images[0]} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <WishlistButton 
          onClick={handleWishlistToggle}
          $active={isInWishlist}
        >
          {isInWishlist ? '❤️ Remove' : '♡ Add'}
        </WishlistButton>
      </div>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  position: relative;

  .product-info {
    padding-top: 1rem;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const WishlistButton = styled.button`
  background: ${({ $active }) => $active ? '#ff4081' : '#f5f5f5'};
  color: ${({ $active }) => $active ? 'white' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export default ProductCard;