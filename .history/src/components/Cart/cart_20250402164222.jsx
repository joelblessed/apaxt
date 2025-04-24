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
  padding: 20px;
  background-color: #f9f9f9;
`;

const CartEmptyMessage = styled.h1`
  text-align: center;
  margin-top: 50px;
  color: #333;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const CartItemContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CartItemImage = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  border-radius: 8px;
  
  @media (min-width: 768px) {
    margin-right: 20px;
  }
`;

const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CartItemDescription = styled.div`
  font-size: 14px;
  color: #555;
`;

const CartItemName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const CartItemPrice = styled.div`
  font-size: 16px;
  color: #333;
`;

const CartItemQuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CartItemQuantity = styled.div`
  font-size: 16px;
  color: #333;
`;

const CartItemButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: #fff;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CartItemDeleteButton = styled(CartItemButton)`
  background-color: #f44336;
`;

const CartCheckoutButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  background-color: #2196f3;
  color: #fff;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const Cart = ({ api, highlightText, searchTerm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("token");

  // 1. Load cart from localStorage before login
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!token && storedCart.length > 0) {
      dispatch({ type: "cart/setCart", payload: storedCart });
    }
  }, [dispatch, token]);

  // 2. Load cart from server after login
  useEffect(() => {
    if (token) {
      dispatch(loadCartAfterLogin());
    }
  }, [dispatch, token]);

  return (
    <CartContainer>
      {cart.length === 0 ? (
        <CartEmptyMessage>No items in the cart</CartEmptyMessage>
      ) : (
        <CartItemsContainer>
          {cart.map((product) => (
            <CartItem key={product.id}>
              <CartItemContent>
                {product.images && product.images.length > 0 ? (
                  <CartItemImage
                    src={product.images[0]}
                    alt={product.name}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <CartItemDetails>
                  <CartItemDescription>{product.desc}</CartItemDescription>
                  <CartItemName>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightText(product.name, searchTerm),
                      }}
                    />
                  </CartItemName>
                  <CartItemPrice>Price: CFA {product.price}</CartItemPrice>
                  <CartItemQuantityControls>
                    <CartItemQuantity>{product.quantity}</CartItemQuantity>
                    <CartItemButton
                      onClick={() => dispatch(incrementProductQuantity(product.id))}
                      disabled={product.quantity >= product.numberInStock}
                    >
                      +
                    </CartItemButton>
                    <CartItemButton
                      onClick={() => dispatch(decrementProductQuantity(product.id))}
                      disabled={product.quantity <= 1}
                    >
                      -
                    </CartItemButton>
                    <CartItemDeleteButton
                      onClick={() => dispatch(removeFromCartAPI(product.id))}
                    >
                      X
                    </CartItemDeleteButton>
                  </CartItemQuantityControls>
                </CartItemDetails>
              </CartItemContent>
            </CartItem>
          ))}
          <CartCheckoutButton to="/checkout">
            Checkout
          </CartCheckoutButton>
        </CartItemsContainer>
      )}
    </CartContainer>
  );
};

export default Cart;