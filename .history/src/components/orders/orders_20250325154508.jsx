import { useEffect, useState } from "react";

const Orders = ({ }) => {
  const [orders, setOrders] = useState([]);
  const user

  useEffect(() => {
    fetch(`http://localhost:5000/orders/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId, token]);

  const handleCancel = async (orderId) => {
    await fetch(`http://localhost:5000/orders/cancel/${orderId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "Canceled" } : order)));
  };

  const handleDeliver = async (orderId) => {
    const response = await fetch(`http://localhost:5000/orders/deliver/${orderId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Delivered", shipping: { ...order.shipping, deliveryDate: data.deliveryDate } } : order
      )
    );
  };

  return (
    <div>
      <h2>My Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - {order.status} - {order.shipping?.deliveryDate || "Not Delivered"}
            <button onClick={() => handleCancel(order.id)} disabled={order.status !== "Pending"}>
              Cancel
            </button>
            <button onClick={() => handleDeliver(order.id)} disabled={order.status !== "Pending"}>
              Mark as Delivered
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;