import React, { useEffect, useState } from 'react';
import { getHouses } from '../api';

export default function HouseList() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    getHouses().then(res => setHouses(res.data));
  }, []);

  return (
    <div>
      <h2>Available Houses</h2>
      {houses.map(h => (
        <div key={h.id} className="card">
          <h3>{h.title}</h3>
          <p>{h.description}</p>
          <p>Location: {h.location}</p>
          <p>Bedrooms: {h.bedrooms} | Size: {h.size} sqm</p>
          <p>Rent: {h.rent} RWF</p>
        </div>
      ))}
    </div>
  );
}
