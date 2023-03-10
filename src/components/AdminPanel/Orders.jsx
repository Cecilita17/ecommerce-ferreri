import React, { useState, useEffect } from "react";
import { db } from "../../service/firebase";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import "./Orders.css"


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const collectionRef = collection(db, "orders");
      const snapshot = await getDocs(collectionRef);
      const ordersArray = [];
      snapshot.forEach((doc) => {
        const ordersData = { ...doc.data(), id: doc.id };
        ordersArray.push(ordersData);
      });
      setOrders(ordersArray);
      console.log(orders);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: status });
    setOrders(prevOrders => prevOrders.map(order => {
      if(order.id === orderId) {
        return {...order, status: status};
      } else {
        return order;
      }
    }));
  };

  /* const handleDelete = async (orderId, index) => {
    // Delete product from database
    // ...
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  }; */

  return (
    <div >
      <h5 className="edit-title" style={{fontFamily: "monserrat"}}>Orders:</h5>
  
      <div className="orders-container">
        <div className="order-table">
          <div className="table-header-orders">
            <div className="order-customer">Customer</div>
            <div className="order-product">Product</div>
            <div className="order-price">Price</div>
            <div className="order-id">Order ID</div>
            <div className="order-status">Status</div>
          </div>
          {orders.map((order, index) => (
            <div key={order.id} id={`order-${index}`} className="table-row-orders">
              
                <div className="order-customer">{order.buyer.name}</div>
                <div className="order-product">{order.items[0].title}</div>
                <div className="order-price">{order.items[0].price}</div>
                <div className="order-id">{order.id}</div>

                <div className="order-status">
                    <select
                      value={order.status || ""}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                </div>
              
          </div>
          ))}
        </div>
      </div>
  
    </div>
  );
  
};
export default Orders;