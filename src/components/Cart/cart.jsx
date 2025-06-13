import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loadCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCartWithAuth,
  clearCartWithAuth,
} from "../../cartJs/cartThunks";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 0;

  p {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }

  .details {
    margin-left: 1rem;
    flex: 1;

    h3 {
      font-weight: 500;
    }

    p {
      color: #6b7280;
    }

    .actions {
      display: flex;
      align-items: center;
      margin-top: 0.5rem;

      button {
        padding: 0.25rem 0.5rem;
        border: 1px solid #d1d5db;
        background: white;
        cursor: pointer;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        &:first-child {
          border-radius: 4px 0 0 4px;
        }

        &:last-child {
          border-radius: 0 4px 4px 0;
        }
      }

      .remove {
        margin-left: 1rem;
        color: #ef4444;
        cursor: pointer;

        &:hover {
          color: #dc2626;
        }
      }
    }
  }
`;

const ClearCartButton = styled.button`
  margin-top: 1rem;
  color: #ef4444;
  cursor: pointer;

  &:hover {
    color: #dc2626;
  }
`;

const Summary = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  h2 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    &:last-child {
      font-weight: bold;
      font-size: 1.125rem;
    }
  }

  button {
    width: 100%;
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const CartPage = ({ glofilteredProducts }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCartWithAuth(productId));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCartWithAuth());
    }
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.final_price * item.quantity, 0)
      .toFixed(2);
  };

  const dotStyle = {
  width: "12px",
  height: "12px",
  margin: "0 4px",
  borderRadius: "50%",
  background: "#333",
  display: "inline-block",
  animation: "bounce 1s infinite alternate",
};

const dot2Style = { ...dotStyle, animationDelay: "0.2s" };
const dot3Style = { ...dotStyle, animationDelay: "0.4s" };

  if (loading) return <div>
    
 <span style={dotStyle}></span>
    <span style={dot2Style}></span>
    <span style={dot3Style}></span> 
    
  </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Title>Your Shopping Cart</Title>
      {items.length === 0 ? (
        <EmptyCart>
          <p>Your cart is empty</p>
          <Link to="/products">Continue Shopping</Link>
        </EmptyCart>
      ) : (
        <Grid>
          <div>
            <CartItems>
              {items.map((item) => (
                <CartItem key={item.product_id}>
                  <img
                    src={
                      glofilteredProducts.find(
                        (pro) => pro.id === item.product_id
                      )?.images[0]
                    }
                    alt={item.name}
                  />
                  <div className="details">
                    <h3>
                      {
                        glofilteredProducts.find(
                          (pro) => pro.id === item.product_id
                        )?.name
                      }
                    </h3>
                    <p>${item.final_price}</p>
                    <div className="actions">
                      <button
                        onClick={() => handleIncrement(item.product_id)}
                        disabled={
                          item.quantity >=
                          glofilteredProducts.find(
                            (pro) => pro.id === item.product_id
                          )?.number_in_stock
                        }
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleDecrement(item.product_id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleRemove(item.product_id)}
                        className="remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </CartItem>
              ))}
            </CartItems>
            <ClearCartButton onClick={handleClearCart}>
              Clear Cart
            </ClearCartButton>
          </div>
          <Summary>
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal ({items.length} items)</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="summary-item">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
            <button onclick={handleCheckout}>Proceed to Checkout</button>
          </Summary>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
