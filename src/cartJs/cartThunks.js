import { 
  setCartLoading, 
  setCartError, 
  setCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart as clearCartAction
} from '../cartSlice';
import * as cartApi from './cartAPI';

export const loadCart = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle guest cart from localStorage
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      dispatch(setCart(localCart));
      return;
    }
    
    dispatch(setCartLoading());
    const { cart } = await cartApi.fetchCart(token);
    dispatch(setCart(cart));
  } catch (error) {
    dispatch(setCartError(error.message));
  }
};

export const addToCartWithAuth = (product) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle guest cart
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = localCart.find(item => item.product_id === product.id);
      
      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
      
        localCart.push({
          product_id: product.id,
          ...product,
          quantity: product.quantity || 1,
          price: product.price
        });
      }
     
      

      localStorage.setItem('cart', JSON.stringify(localCart));
      dispatch(setCart(localCart));
      return;
    }
    
    dispatch(setCartLoading());
    const { cart } = await cartApi.addToCart(product.id, product.quantity || 1, token);
    dispatch(setCart(cart));
  } catch (error) {
    dispatch(setCartError(error.message));
  }
};

export const incrementQuantity = (productId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle guest cart
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const item = localCart.find(item => item.product_id === productId);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(localCart));
        dispatch(setCart(localCart));
      }
      return;
    }
    
    dispatch(setCartLoading());
    const { cart } = await cartApi.updateCartItem(productId, 'increment', token);
    dispatch(setCart(cart));
  } catch (error) {
    dispatch(setCartError(error.message));
  }
};

export const decrementQuantity = (productId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle guest cart
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const item = localCart.find(item => item.product_id === productId);
      if (item) {
        item.quantity = Math.max(1, item.quantity - 1);
        localStorage.setItem('cart', JSON.stringify(localCart));
        dispatch(setCart(localCart));
      }
      return;
    }
    
    dispatch(setCartLoading());
    const { cart } = await cartApi.updateCartItem(productId, 'decrement', token);
    dispatch(setCart(cart));
  } catch (error) {
    dispatch(setCartError(error.message));
  }
};

export const removeFromCartWithAuth = (productId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle guest cart
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = localCart.filter(item => item.product_id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      dispatch(setCart(updatedCart));
      return;
    }
    
    dispatch(setCartLoading());
    const { cart } = await cartApi.removeFromCart(productId, token);
    dispatch(setCart(cart));
  } catch (error) {
    dispatch(setCartError(error.message));
  }
};

export const mergeCartsAfterLogin = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (localCart.length === 0) return;
    
    dispatch(setCartLoading());
    const { cart } = await cartApi.mergeCarts(localCart, token);
    dispatch(setCart(cart));
    // localStorage.removeItem('cart');
    alert('SUCCESS')
  } catch (error) {
    alert("erro")
    dispatch(setCartError(error.message));
    // Fallback to loading server cart only
    dispatch(loadCart());
  }
};



export const clearCartWithAuth = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('cart');
      dispatch(clearCartAction());
      return;
    }
    
    dispatch(setCartLoading());
    await cartApi.clearCart(token);
    dispatch(clearCartAction());
  } catch (error) {
    dispatch(setCartError(error.message));
  }
};