import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const PrivateRoute = ({ children }) => {
  const { token, setShowLogin } = useContext(StoreContext);
  if (!token) {
    setShowLogin(true);
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
