import React, { useContext, useState } from 'react';

import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu]=useState("menu");
  const [search, setSearch] = useState("");
  const { getTotalCartAmount, token, setToken, foodList } = useContext(StoreContext);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Get user name and admin status from token if available
  React.useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserName(payload.name || payload.email?.split('@')[0] || "User");
        setIsAdmin(!!payload.isAdmin);
      } catch {
        setUserName("");
        setIsAdmin(false);
      }
    } else {
      setUserName("");
      setIsAdmin(false);
    }
  }, [token]);

  const logout = () =>{
    localStorage.removeItem("token")
    setToken("");
    navigate("/")
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className='navbar'>
    <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
    <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")}className={menu==="contact-us"?"active":""}>contact us</a>
    </ul>
    <div className="navbar-right">
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #ccc', outline: 'none' }}
        />
        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <img src={assets.search_icon} alt="Search" />
        </button>
      </form>
      <div className="navbar-search-icon">
        <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
        <div className={getTotalCartAmount()===0?"":"dot"}></div>
      </div>
      {!token? <button onClick={()=>setShowLogin(true)}>sign in</button>
        : <div className="navbar-profile">
          <span style={{fontWeight:'bold',marginRight:8}}>{userName}</span>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/orders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            {isAdmin && <li onClick={()=>navigate('/admin/list')}><img src={assets.bag_icon} alt="" /><p>Admin Dashboard</p></li>}
            <hr />
            <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div> }
    </div>
       
    </div>
  )
}

export default Navbar
