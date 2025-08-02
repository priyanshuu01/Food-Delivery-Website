import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    console.log("=== FETCHING ORDERS ===");
    console.log("Token:", token);
    console.log("URL:", url + "/api/order/userorders");
    
    try {
      if (!token) {
        console.log("No token found - user not logged in");
        return;
      }
      
      const response = await axios.post(url + "/api/order/userorders", {}, {
        headers: { token }
      });
      
      console.log("Orders API Response:", response.data);
      
      if (response.data.success) {
        setData(response.data.data);
        console.log("Orders set:", response.data.data);
      } else {
        console.error("API returned error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  useEffect(() => {
    console.log("MyOrders useEffect - Token:", token);
    if (token) {
      fetchOrders();
    } else {
      console.log("No token available, user needs to login");
    }
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'food processing': return '#ff6b35';
      case 'out for delivery': return '#f7931e';
      case 'delivered': return '#4caf50';
      default: return '#666';
    }
  };

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      {data.length === 0 ? (
        <div className="no-orders">
          <p>No orders found. Start ordering your favorite food!</p>
        </div>
      ) : (
        <div className="orders-container">
          {data.map((order, index) => {
            return (
              <div key={index} className='order-card'>
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                    <p className="order-date">{formatDate(order.date)}</p>
                  </div>
                  <div className="payment-status">
                    <span className={`payment-badge ${order.payment ? 'paid' : 'pending'}`}>
                      {order.payment ? '✓ Paid' : '⏳ Pending'}
                    </span>
                  </div>
                </div>

                <div className="order-body">
                  <div className="order-items">
                    <h4>Order Items:</h4>
                    <div className="items-list">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="item-row">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="delivery-info">
                    <h4>Delivery Information:</h4>
                    <div className="address-details">
                      <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
                      <p><strong>Phone:</strong> {order.address.phone}</p>
                      <p><strong>Email:</strong> {order.address.email}</p>
                      <p><strong>Address:</strong> {order.address.street}, {order.address.city}</p>
                      <p><strong>State:</strong> {order.address.state}, {order.address.zipcode}</p>
                      <p><strong>Country:</strong> {order.address.country}</p>
                    </div>
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-summary">
                    <div className="total-amount">
                      <strong>Total: ${order.amount}</strong>
                    </div>
                    <div className="order-status">
                      <span 
                        className="status-indicator"
                        style={{ color: getStatusColor(order.status) }}
                      >
                        ● {order.status}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="track-btn"
                    onClick={fetchOrders}
                  >
                    🔄 Refresh Status
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
