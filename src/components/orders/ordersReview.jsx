import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ordersReview.css';

const OrdersReview = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock API fetch (replace with actual API call)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockOrders = [
          {
            id: 'ORD-78945',
            date: '2023-05-15',
            status: 'delivered',
            total: 149.99,
            items: [
              { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1, image: '/images/headphones.jpg' },
              { id: 2, name: 'Phone Case', price: 25.00, quantity: 2, image: '/images/case.jpg' }
            ],
            trackingNumber: 'UPS-7845123698',
            deliveryDate: '2023-05-18',
            address: '123 Main St, Apt 4B, New York, NY 10001'
          },
          {
            id: 'ORD-12345',
            date: '2023-06-20',
            status: 'shipped',
            total: 87.50,
            items: [
              { id: 3, name: 'Smart Watch', price: 87.50, quantity: 1, image: '/images/watch.jpg' }
            ],
            trackingNumber: 'FEDEX-985632147',
            estimatedDelivery: '2023-06-25',
            address: '123 Main St, Apt 4B, New York, NY 10001'
          },
          {
            id: 'ORD-45678',
            date: '2023-07-10',
            status: 'processing',
            total: 42.97,
            items: [
              { id: 4, name: 'USB-C Cable', price: 12.99, quantity: 2, image: '/images/cable.jpg' },
              { id: 5, name: 'Screen Protector', price: 16.99, quantity: 1, image: '/images/protector.jpg' }
            ],
            address: '123 Main St, Apt 4B, New York, NY 10001'
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filter !== 'all' && order.status !== filter) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      delivered: { class: 'delivered', text: 'Delivered' },
      shipped: { class: 'shipped', text: 'Shipped' },
      processing: { class: 'processing', text: 'Processing' },
      cancelled: { class: 'cancelled', text: 'Cancelled' }
    };
    
    const statusInfo = statusMap[status] || { class: 'default', text: status };
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.text}</span>;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="no-orders">
        <h3>No orders found</h3>
        {filter !== 'all' || searchQuery ? (
          <button 
            className="clear-filters" 
            onClick={() => {
              setFilter('all');
              setSearchQuery('');
            }}
          >
            Clear filters
          </button>
        ) : (
          <Link to="/products" className="shop-now">
            Start Shopping
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="orders-review-container">
      <div className="orders-header">
        <h2>Your Orders</h2>
        <div className="orders-controls">
          <div className="search-orders">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="search-icon">🔍</i>
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Orders</option>
            <option value="delivered">Delivered</option>
            <option value="shipped">Shipped</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div 
            key={order.id} 
            className={`order-card ${expandedOrder === order.id ? 'expanded' : ''}`}
          >
            <div 
              className="order-summary" 
              onClick={() => toggleOrderExpansion(order.id)}
            >
              <div className="order-meta">
                <div>
                  <h4>Order #{order.id}</h4>
                  <p className="order-date">Placed on {formatDate(order.date)}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="order-preview">
                <div className="items-preview">
                  {order.items.slice(0, 2).map((item, index) => (
                    <img 
                      key={index} 
                      src={item.image} 
                      alt={item.name} 
                      className="item-thumbnail"
                    />
                  ))}
                  {order.items.length > 2 && (
                    <div className="more-items">+{order.items.length - 2} more</div>
                  )}
                </div>
                <div className="order-total">${order.total.toFixed(2)}</div>
              </div>
            </div>
            
            {expandedOrder === order.id && (
              <div className="order-details">
                <div className="shipping-info">
                  <h5>Shipping Information</h5>
                  <p>{order.address}</p>
                  {order.trackingNumber && (
                    <div className="tracking">
                      <span>Tracking #: {order.trackingNumber}</span>
                      {order.status === 'shipped' && order.estimatedDelivery && (
                        <span>Estimated delivery: {formatDate(order.estimatedDelivery)}</span>
                      )}
                      {order.status === 'delivered' && order.deliveryDate && (
                        <span>Delivered on: {formatDate(order.deliveryDate)}</span>
                      )}
                      <button className="track-package">Track Package</button>
                    </div>
                  )}
                </div>
                
                <div className="items-list">
                  <h5>Items</h5>
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-info">
                        <Link to={`/products/${item.id}`} className="item-name">{item.name}</Link>
                        <div className="item-price">${item.price.toFixed(2)} × {item.quantity}</div>
                      </div>
                      <button className="buy-again">Buy Again</button>
                    </div>
                  ))}
                </div>
                
                <div className="order-actions">
                  <button className="action-button">Return Items</button>
                  <button className="action-button">Leave Feedback</button>
                  <button className="action-button">View Invoice</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersReview;