import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    {/* <img src={assets.logo} alt="" /> */}
                    <Link to='/'><h1 class="desi-title">DesiDelight</h1></Link>


                    <p>Welcome to Tomato – your go-to destination for quick, tasty, and reliable food delivery! 
                        Whether you're craving a cheesy pizza, a spicy biryani, or a healthy salad, Tomato connects 
                        you with the best restaurants near you. Order in seconds and enjoy your favorite meals delivered hot
                        and fresh at your doorstep.</p>

                    <p>Welcome to Tomato – your go-to destination for quick, tasty, and reliable food delivery!
                      Whether you're craving a cheesy pizza, a spicy biryani, or a healthy salad, Tomato connects you with the best
                      restaurants near you. Order in seconds and enjoy your favorite meals delivered hot and fresh at your doorstep.</p>

                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="food-content-center">
                   <h2>COMPANY</h2>
                   <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                   </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
          <p className="footer-copyright"> Copyrigth 2025 © Tomato.com - All Right Reserved. </p>
        </div>
    )
}

export default Footer
