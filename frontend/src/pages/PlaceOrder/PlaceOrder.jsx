// import React, { useContext, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import {useNavigate} from "react-router-dom"

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreContext);

//   const navigate=useNavigate();

//   const [data, setData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: '',
//   })

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }))
//   }

//   const placeOrder = async (event) => {
//     event.preventDefault();

//     let orderItems=[];
//     foodList.map((item)=>{
//        if(cartItems[item._id]>0){
//         let itemInfo=item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo)
//        }
//     })

//     let orderData = {
//      // address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     }
//     let response = await axios.post(url+"/api/order/place",orderData);
//     console.log(response);
//     if(response.status==200){

//       navigate('/payment');
//         console.log("we will naviagate to success page ");
//       // const {session_url} = response.data;
//       // window.location.replace(session_url);
//     }
//     else{
//       alert("Error");
//     } 

   

//   }

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
//           <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
//         </div>
//         <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
//         <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
//         <div className="multi-fields">
//           <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
//           <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
//         </div>
//         <div className="multi-fields">
//           <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
//           <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
//         </div>
//         <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//             </div>
//           </div>
//           <button type="submit">PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;


import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];
      foodList.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] };
          orderItems.push(itemInfo);
        }
      });

      const orderData = {
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };

      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log("Order placed response:", response);

      if (response.status >= 200 && response.status < 300) {
        console.log("Navigating to /payment...");
        navigate('/payment');
      } else {
        console.warn("Unexpected response status:", response.status);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Server error. Please check console.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

