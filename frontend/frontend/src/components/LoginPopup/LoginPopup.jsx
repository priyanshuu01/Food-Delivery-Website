import React, { useContext, useState, useEffect, useRef } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserAndWelcome } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState("");
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the login popup when it appears
    if (popupRef.current) {
      popupRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        setUserAndWelcome(response.data.name || data.name || data.email.split('@')[0]);
        if (response.data.isAdmin) {
          navigate("/admin");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {showWelcome && (
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '12px 24px', zIndex: 9999, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <b>Welcome, {userName}!</b>
        </div>
      )}
      <div className='login-popup' ref={popupRef}>
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <div className="login-popup-inputs">
            {currState === "Signup" && (
              <input
                name='name'
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder='Your name'
                required
              />
            )}
            <input
              name='email'
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder='Your email'
              required
            />
            <input
              name='password'
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder='Password'
              required
            />
          </div>
          <button type='submit'>{currState === "Signup" ? "Create account" : "Login"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>Create a new account <span onClick={() => setCurrState("Signup")}>Click here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
