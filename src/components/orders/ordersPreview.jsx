import React from 'react';
import { Link } from 'react-router-dom';
import './ordersPreview.css';

// Dummy Data
const dummyData = {
  cartItems: [
    {
      id: 'prod_001',
      name: 'Wireless Bluetooth Headphones',
      image: 'https://m.media-amazon.com/images/I/61+Q6Rhbu6L._AC_SL1500_.jpg',
      price: 129.99,
      quantity: 1,
      variant: 'Black',
      inStock: true
    },
    {
      id: 'prod_002',
      name: 'Smart Fitness Tracker',
      image: 'https://m.media-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg',
      price: 79.95,
      quantity: 2,
      variant: 'Midnight Blue',
      inStock: true
    },
    {
      id: 'prod_003',
      name: 'Organic Cotton T-Shirt',
      image: 'https://m.media-amazon.com/images/I/61-jAhtd2VL._AC_SX569_.jpg',
      price: 24.99,
      quantity: 3,
      variant: 'Medium / White',
      inStock: true
    }
  ],
  shippingInfo: {
    name: 'Alex Johnson',
    address: '1234 Main Street',
    apartment: 'Apt 302',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    country: 'United States',
    phone: '(206) 555-0123',
    shippingMethod: 'Express Shipping',
    estimatedDelivery: 'Thursday, May 25'
  },
  paymentMethod: {
    type: 'credit_card',
    brand: 'visa',
    last4: '4242',
    expMonth: '12',
    expYear: '2026',
    name: 'Alex Johnson'
  },
  priceSummary: {
    subtotal: 329.92,
    shippingCost: 12.99,
    tax: 29.69,
    discount: {
      code: 'SUMMER10',
      amount: 32.99
    },
    total: 339.61
  }
};

const OrdersPreview = () => {
  // Handler functions
  const handleEditShipping = () => {
    console.log('Edit shipping clicked');
    // In a real app, this would navigate back to shipping form
  };

  const handleEditPayment = () => {
    console.log('Edit payment clicked');
    // In a real app, this would navigate back to payment form
  };

  const handlePlaceOrder = () => {
    console.log('Place order clicked');
    // In a real app, this would process the order
  };

  return (
    <div className="pre-payment-review">
      <h2 className="review-title">Review Your Order</h2>
      
      <div className="review-sections">
        {/* Shipping Information */}
        <div className="review-section">
          <div className="section-header">
            <h3>Shipping Information</h3>
            <button onClick={handleEditShipping} className="edit-button">Edit</button>
          </div>
          <div className="section-content">
            <p>{dummyData.shippingInfo.name}</p>
            <p>{dummyData.shippingInfo.address}, {dummyData.shippingInfo.apartment}</p>
            <p>{dummyData.shippingInfo.city}, {dummyData.shippingInfo.state} {dummyData.shippingInfo.zip}</p>
            <p>{dummyData.shippingInfo.country}</p>
            <p>Phone: {dummyData.shippingInfo.phone}</p>
            <p className="shipping-method">
              Shipping method: {dummyData.shippingInfo.shippingMethod} 
              <span> (Estimated delivery: {dummyData.shippingInfo.estimatedDelivery})</span>
            </p>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="review-section">
          <div className="section-header">
            <h3>Payment Method</h3>
            <button onClick={handleEditPayment} className="edit-button">Edit</button>
          </div>
          <div className="section-content">
            {dummyData.paymentMethod.type === 'credit_card' && (
              <>
                <div className="payment-method">
                  <div className="card-icon">
                    {dummyData.paymentMethod.brand === 'visa' && '💳'}
                    {dummyData.paymentMethod.brand === 'mastercard' && '💳'}
                    {dummyData.paymentMethod.brand === 'amex' && '💳'}
                  </div>
                  <div className="card-details">
                    <p>Card ending in •••• {dummyData.paymentMethod.last4}</p>
                    <p>Expires: {dummyData.paymentMethod.expMonth}/{dummyData.paymentMethod.expYear}</p>
                    <p>Cardholder: {dummyData.paymentMethod.name}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Order Items */}
        <div className="review-section">
          <div className="section-header">
            <h3>Order Items ({dummyData.cartItems.reduce((total, item) => total + item.quantity, 0)})</h3>
            <Link to="/cart" className="edit-button">Edit</Link>
          </div>
          <div className="order-items">
            {dummyData.cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <span className="item-quantity">{item.quantity}</span>
                </div>
                <div className="item-details">
                  <Link to={`/products/${item.id}`} className="item-name">{item.name}</Link>
                  {item.variant && <p className="item-variant">{item.variant}</p>}
                  <p className="item-price">${item.price.toFixed(2)} each</p>
                  {!item.inStock && <p className="stock-warning">Backordered - ships in 2-3 weeks</p>}
                </div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal ({dummyData.cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
          <span>${dummyData.priceSummary.subtotal.toFixed(2)}</span>
        </div>
        
        {dummyData.priceSummary.discount && (
          <div className="summary-row discount">
            <span>Discount ({dummyData.priceSummary.discount.code})</span>
            <span>-${dummyData.priceSummary.discount.amount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="summary-row">
          <span>Shipping</span>
          <span>{dummyData.priceSummary.shippingCost === 0 ? 'FREE' : `$${dummyData.priceSummary.shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span>${dummyData.priceSummary.tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${dummyData.priceSummary.total.toFixed(2)}</span>
        </div>
        
        <button onClick={handlePlaceOrder} className="place-order-button">
          Place Your Order
        </button>
        
        <p className="secure-checkout">
          <span className="lock-icon">🔒</span> Secure Checkout
        </p>
        
        <p className="return-policy">
          By placing your order, you agree to our <Link to="/return-policy">Return Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default OrdersPreview;











