import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  addToCartBeforeLogin, 
  loadCartAfterLogin, 
  removeFromCartAPI, 
  clearCartOnLogout, 
  incrementProductQuantity, 
  decrementProductQuantity 

} from "../../cartAction";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    margin-top: 150px;
  }

`;

const EmptyMessage = styled.h1`
  text-align: center;
  color: #666;
  margin-top: 3rem;
  font-size: 1.5rem;
`;

const ItemsContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
`;

const CartItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemDescription = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ItemName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ItemPrice = styled.div`
  color: #e63946;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Quantity = styled.div`
  min-width: 30px;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  background: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #e9ecef;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(Button)`
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;

  &:hover:not(:disabled) {
    background: #ff5252;
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  text-align: center;
  background: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 2rem;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s ease;

  &:hover {
    background: #3e8e41;
  }
`;

const NoImage = styled.p`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 4px;
  margin-right: 1rem;
  color: #999;
`;

const Cart = ({ api, highlightText, product, searchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!token && storedCart.length > 0) {
      dispatch({ type: "cart/setCart", payload: storedCart });
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(loadCartAfterLogin());
    }
  }, [dispatch, token]);

  return (
    <CartContainer>
      {cart.length === 0 ? (

        <EmptyMessage>TheCart is Empty</EmptyMessage>
      ) : (
        <ItemsContainer>
          {cart.map((product) => (
            <CartItem key={product.id}>
              {product.images.length > 0 ? (
                <ItemImage
                  src={product.images[0]}
                  alt={product.name}
                />
              ) : (
                <NoImage>No image available</NoImage>
              )}
              <ItemDetails>
                <ItemDescription>{product.desc}</ItemDescription>
                <ItemName>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(product.name, searchTerm),
                    }}
                  ></span>
                </ItemName>
                <ItemPrice>Price: CFA {product.price}</ItemPrice>
                <QuantityControls>
                  <Quantity>{product.quantity}</Quantity>
                  <Button
                    onClick={() => dispatch(incrementProductQuantity(product.id))}
                    disabled={product.quantity >= product.numberInStock}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => dispatch(decrementProductQuantity(product.id))}
                    disabled={product.quantity <= 1}
                  >
                    -
                  </Button>
                  <DeleteButton
                    onClick={() => dispatch(removeFromCartAPI(product.id))}
                  >
                    X
                  </DeleteButton>
                </QuantityControls>
              </ItemDetails>
            </CartItem>
          ))}
          <CheckoutButton to="/checkout">
            Checkout
          </CheckoutButton>
        </ItemsContainer>
      )}
    </CartContainer>
  );
};

export default Cart;