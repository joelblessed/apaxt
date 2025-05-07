import { useState, useEffect } from 'react';


const Orders2 = ({api}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
 

 const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch(`${api}/orders/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId, token]);

  return (
    <div className="order-list">
      <h2>All Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Delivery Date</th>
            <th>Items</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td> (ID: {order.user_id})</td>
              <td>{new Date(order.placed_at).toLocaleString()}</td>
              <td>${order.total_amount}</td>
              <td>{order.status}</td>
              <td>{order.shipping.deliveryDate}</td>
              <td>
                {order.cart.map(item => (
                  <div key={item.id}>
                    {item.name} 
                  </div>
                ))}
              </td>
              <td>
              {order.cart.map(item => (
                  <div key={item.id}>
                    {item.quantity} 
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders2