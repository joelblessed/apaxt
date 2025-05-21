import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const OrderItem = ({ item, order, glofilteredProducts, Card }) => {
  const { t } = useTranslation();
  const product = glofilteredProducts.find((pro) => pro.id === item.product_id);
  const productImage = product?.images[0] || "";

  return (<>
    <Card key={item.id}>
      <img
        src={productImage}
        alt={t("Loading...")}
        style={{ width: "100px", height: "100px" }}
      />
      <h3>{item.name}</h3>
      <p>{t("Price")}: ${item.price}</p>
      <p>{t("Quantity")}: {item.quantity}</p>
      <p>{t("Status")}: {order.status}</p>
  
    </Card>
</>
  );
};

const Orders = ({ api, glofilteredProducts , Header, ResponsiveGrid, Card }) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordersId] = useState("201");
const [orderC, setOrderC] = useState(1);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${api}/orders/${userId}`, {
          headers: {   Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data);
        const count = data.map(d => d.cart.map(c => c.length))
        localStorage.setItem("OrdersCount",count )
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [api, userId, token]);

  const handleCancel = async (orderId) => {
    await fetch(`${api}/orders/cancel/${orderId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
   
  };

  if (loading) return <div>{t("Loading...")}</div>;
  if (error) return <div>{t("Error")}: {error}</div>;

  return (
    <div>
      <Header>{t("Orders Management")}</Header>
      <ResponsiveGrid >
        {orders.length > 0 ? (
          orders.map((order) =>
            order.status === "Pending" ? (
              <div key={order.id} style={{display:"flex", flexWrap:'wrap', background:"green", gap:"20px", padding:"30px", }} >
                <h2>{t("Order")}: {order.placed_at} </h2>
                {order.length > 1 && setOrderC(+1)}
                {order.cart.map(
                  (item) =>
                    !item.canceledOrder &&  (<>
                      
                      <OrderItem
                        key={item.id}
                        item={item}
                        glofilteredProducts={glofilteredProducts}
                        Card={Card}
                        order={order}
                      />
    
</>
                    )
                   
                )}
                 <button onClick={()=> handleCancel(order.id)} styles={{background:'red', borderRadius:"10px", height:"100px"}}>Cancel Order</button>

              </div>
            ) : null
          )
        ) : (
          <div>{t("Place an order")}</div>
        )}
      </ResponsiveGrid>
    </div>
  );
};

export default Orders;