import React, { useState } from 'react';
import { getLandlordStats } from '../api';

export default function LandlordDashboard() {
  const [id, setId] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = () => {
    getLandlordStats(id).then(res => setStats(res.data));
  };

  return (
    <div>
      <h2>Landlord Dashboard</h2>
      <input placeholder="Enter Landlord ID" value={id} onChange={e => setId(e.target.value)} />
      <button onClick={fetchStats}>View Stats</button>
      {stats && (
        <div>
          <p>Total Listings: {stats.listings}</p>
          <p>Average Rent: {stats.avg_rent} RWF</p>
        </div>
      )}
    </div>
  );
}
