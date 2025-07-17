import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create context
export const StoreContext = createContext(null);

export function StoreContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [showLogin, setShowLogin] = useState(false); // Add login popup state
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  // const url = "http://localhost:4000";
  const url = "https://food-delivery-backend2-i6r4.onrender.com";

  const addToCart = async (itemId) => {
    if (!token) {
      setShowLogin(true); // Show login popup if not logged in
      return;
    }
    if(!cartItems[itemId]){
      setCartItems((prev) => ({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev) => ({...prev , [itemId] : prev[itemId] +1}))
    }
    await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = foodList.find((product) => product._id === itemId);
      if (item) {
        totalAmount += item.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response)
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadData();
  }, []);

  const setUserAndWelcome = (name) => {
    setUserName(name);
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 3000);
  };

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    showLogin,
    setShowLogin,
    userName,
    setUserName,
    showWelcome,
    setShowWelcome,
    setUserAndWelcome,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {showWelcome && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '12px 24px', zIndex: 9999, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <b>Welcome, {userName}!</b>
        </div>
      )}
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
