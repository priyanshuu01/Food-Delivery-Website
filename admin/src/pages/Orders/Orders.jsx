import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Fetched orders:", response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        toast.success("Status updated successfully");
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className='orders'>
      <div className="orders-header">
        <h2>Order Management</h2>
        <div className="orders-stats">
          <div className="stat-card">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <h3>{orders.filter(order => order.payment).length}</h3>
            <p>Paid Orders</p>
          </div>
          <div className="stat-card">
            <h3>{orders.filter(order => order.status === 'Delivered').length}</h3>
            <p>Delivered</p>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className='order-item'>
              <div className="order-main">
                <div className="order-info">
                  <div className="order-header-info">
                    <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                    <span className={`payment-status ${order.payment ? 'paid' : 'pending'}`}>
                      {order.payment ? '✓ Paid' : '⏳ Pending'}
                    </span>
                  </div>
                  <p className="order-date">{formatDate(order.date)}</p>
                  <p className="order-amount">Total: ${order.amount}</p>
                </div>

                <div className="customer-info">
                  <h4>Customer Details</h4>
                  <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
                  <p><strong>Phone:</strong> {order.address.phone}</p>
                  <p><strong>Email:</strong> {order.address.email}</p>
                </div>

                <div className="delivery-address">
                  <h4>Delivery Address</h4>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
                  <p>{order.address.country}</p>
                </div>

                <div className="order-items">
                  <h4>Items Ordered</h4>
                  <div className="items-grid">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="item-card">
                        <span className="item-name">{item.name}</span>
                        <span className="item-details">x{item.quantity} - ${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-actions">
                <div className="status-section">
                  <label>Order Status:</label>
                  <select 
                    onChange={(event) => statusHandler(event, order._id)} 
                    value={order.status}
                    className="status-select"
                    style={{ borderColor: getStatusColor(order.status) }}
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <button 
                  className="refresh-btn"
                  onClick={fetchAllOrders}
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
