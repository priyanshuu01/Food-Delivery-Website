import React from 'react';
import './payment.css';
import paymentBanner from '../../assets/payment-banner.jpg'; // Adjust path as needed

const Payment = () => {
  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <img src={paymentBanner} alt="Payment Banner" className="payment-banner" />
      <p>This is the payment screen after placing the order.</p>
    </div>
  );
};

export default Payment;
