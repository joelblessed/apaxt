import { useState, useEffect } from "react";

const Orders2 = ({ api, glofilteredProducts }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${api}/orders/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId, token]);

  const handleCancel = async (orderId) => {
    await fetch(`${api}/orders/cancel/${orderId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Canceled" } : order
      )
    );
  };

  const handleDeliver = async (orderId) => {
    const response = await fetch(`${api}/orders/deliver/${orderId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "Delivered",
              shipping: { ...order.shipping, deliveryDate: data.deliveryDate },
            }
          : order
      )
    );
  };

  const handleRedo = async (orderId) => {
    const response = await fetch(`${api}/orders/redo/${orderId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "Pending",
              shipping: { ...order.shipping, deliveryDate: data.deliveryDate },
            }
          : order
      )
    );
  };

  return (
    <div className="order-list">
      <h2>All Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th> Order ID</th>
            <th>user ID</th>
            <th>user Image</th>
            <th>User</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Delivery Date</th>
            <th>Item Image</th>
            <th>Items</th>
            <th>quantity</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td> (ID: {order.user_id})</td>
              <td>
                <img
                  src={order.user_data.map((ud) => ud.profile_image)}
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>{order.user_data.map((ud) => ud.username)}</td>
              <td>{new Date(order.placed_at).toLocaleString()}</td>
              <td>${order.total_amount}</td>
              <td>{order.status}</td>
              <td>{order.shipping.deliveryDate}</td>
              <td>
                {order.cart.map((item) => (
                  <div key={item.id}>
                    <img
                      src={
                        glofilteredProducts.find(
                          (pro) => pro.id === item.product_id
                        )?.images[0]
                      }
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                ))}
              </td>
              <td>
                {order.cart.map((item) => (
                  <div key={item.id} style={{ marginTop: "50px" }}>
                    {item.name}
                  </div>
                ))}
              </td>
              <td>
                {order.cart.map((item) => (
                  <div key={item.id} style={{ marginTop: "50px" }}>
                    {item.quantity}
                  </div>
                ))}
              </td>
              <td>
                {order.status === "Canceled" ? (
                  <button
                    onClick={() => handleRedo(order.id)}
                    disabled={order.status === "Delivered"}
                    style={{
                      width: "80px",
                      height: "50px",
                      background: "yellow",
                    }}
                  >
                    Undo
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeliver(order.id)}
                    disabled={order.status === "Delivered"}
                    style={{
                      width: "80px",
                      height: "50px",
                      background: "green",
                    }}
                  >
                    delivered
                  </button>
                )}
              </td>

              <td>
                {order.status === "Delivered" ? (
                  <button
                    onClick={() => handleRedo(order.id)}
                    disabled={order.status === "Canceled"}
                    style={{
                      width: "80px",
                      height: "50px",
                      background: "yellow",
                    }}
                  >
                    Undo
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancel(order.id)}
                    disabled={order.status === "Canceled"}
                    style={{ width: "80px", height: "50px", background: "red" }}
                  >
                    delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders2;
