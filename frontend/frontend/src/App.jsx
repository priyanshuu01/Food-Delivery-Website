// src/App.jsx
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Payment from './pages/Payment/payment';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const { showLogin, setShowLogin, url } = useContext(StoreContext);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
