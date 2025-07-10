import React, { useState } from 'react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('orders')}>Orders</button>
        <button onClick={() => setActiveTab('foods')}>Foods</button>
      </div>
      {activeTab === 'users' && (
        <div>
          <h2>All Users</h2>
          <p>Feature: List, delete users (implement backend endpoint /api/admin/users)</p>
        </div>
      )}
      {activeTab === 'orders' && (
        <div>
          <h2>All Orders</h2>
          <p>Feature: List, update order status (implement backend endpoint /api/admin/orders)</p>
        </div>
      )}
      {activeTab === 'foods' && (
        <div>
          <h2>Manage Foods</h2>
          <p>Feature: Add, edit, delete food items (implement backend endpoint /api/admin/foods)</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
