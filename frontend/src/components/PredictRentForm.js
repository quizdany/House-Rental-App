import React, { useState } from 'react';
import { matchHouses } from '../api';

export default function MatchForm() {
  const [form, setForm] = useState({ budget: '', location: '', bedrooms: '' });
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    matchHouses(form).then(res => setResults(res.data));
  };

  return (
    <div>
      <h2>Smart Match</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Budget" onChange={e => setForm({ ...form, budget: e.target.value })} />
        <input placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
        <input placeholder="Bedrooms" onChange={e => setForm({ ...form, bedrooms: e.target.value })} />
        <button type="submit">Find Matches</button>
      </form>
      <div>
        {results.map(h => (
          <div key={h.id}>
            <h4>{h.title}</h4>
            <p>{h.rent} RWF in {h.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
