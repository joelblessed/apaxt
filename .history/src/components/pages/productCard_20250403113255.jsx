import React from 'react';
import styled from 'styled-components';
import { useWishlist } from '../../useWishlist';
// components/ProductCard.jsx

import { useDispatch, useSelector } from 'react-redux';
import { 
  itemAdded, 
  itemRemoved,
  guestItemAdded,
  guestItemRemoved,
  selectWishlistItems,
  selectGuestWishlistItems
} from '../../wishlistSlice';
import { selectCurrentToken } from '../../authSlice';


const ProductCard = ({ product, isInWishlist, onWishlistToggle, highlightText, searchTerm }) => {

    // const handleWishlistToggle = () => {
    //     if (isInWishlist) {
    //       dispatch(remtem(product.id));
    //       console.log('Removed from wishlist:', product.id);
    //     } else {
    //       dispatch(addItem(product.id));
    //       console.log('Added to wishlist:', product.id);
    //     }
    //   };

  return (
    <Card>
      <ProductImage 
        src={product.images[0]} 
        alt={product.name}
        onError={(e) => e.target.src = '/images/placeholder.jpg'}
      />
      <ProductInfo>
        <ProductName 
          dangerouslySetInnerHTML={{
            __html: highlightText(product.name, searchTerm)
          }}
        />
        <ProductPrice>CFA {product.price.toLocaleString()}</ProductPrice>
        <ProductDescription>
          {product.description?.substring(0, 60)}...
        </ProductDescription>
        <WishlistButton
          onClick={()=> itemAdded()}
          $active={isInWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? '❤️' : '♡'}
        </WishlistButton>
      </ProductInfo>
    </Card>
  );
};

// Styled Components
const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
  position: relative;
`;

const ProductName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
  mark {
    background-color: #ffeb3b;
    padding: 0 2px;
  }
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: #e63946;
  margin: 0.5rem 0;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0 0;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ $active }) => $active ? '#ff4081' : 'rgba(255,255,255,0.8)'};
  color: ${({ $active }) => $active ? 'white' : '#333'};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export default ProductCard;