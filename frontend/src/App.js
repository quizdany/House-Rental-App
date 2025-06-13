import React from 'react';
import HouseList from './components/HouseList';
import MatchForm from './components/MatchForm';
import PredictRentForm from './components/PredictRentForm';
import LandlordDashboard from './components/LandlordDashboard';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏡 HomeLink Rwanda</h1>
      <MatchForm />
      <PredictRentForm />
      <HouseList />
      <LandlordDashboard />
    </div>
  );
}

export default App;
