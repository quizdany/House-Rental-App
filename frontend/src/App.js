import React, { useEffect, useState } from 'react';

function App() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch('https://house-rental-app-backend.onrender.com/api/houses') // Replace with your actual backend Render URL
      .then((res) => res.json())
      .then((data) => setHouses(data))
      .catch((err) => console.error('Failed to fetch houses:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🏡 House Rentals</h1>
      {houses.length === 0 ? (
        <p>Loading houses...</p>
      ) : (
        <ul>
          {houses.map((house) => (
            <li key={house.id} style={{ marginBottom: '1rem' }}>
              <strong>{house.title}</strong><br />
              Price: ${house.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
