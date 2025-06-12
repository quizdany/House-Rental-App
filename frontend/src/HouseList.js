import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HouseList = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // This URL should point to your backend later
    axios.get('http://localhost:5000/api/houses')
      .then(res => setHouses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Houses for Rent</h2>
      <ul>
        {houses.map(house => (
          <li key={house.id}>
            <strong>{house.title}</strong> - ${house.price}/month
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseList;
