import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { useLocation } from 'react-router-dom';

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get('search')?.toLowerCase() || "";

  const filteredList = foodList.filter(item => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = !search || item.name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList && filteredList.length > 0 ? (
          filteredList.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p style={{ padding: 24 }}>No food found.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
