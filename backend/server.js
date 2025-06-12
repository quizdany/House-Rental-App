const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Dummy house data
const houses = [
  { id: 1, title: 'Modern 2BR Apartment in Kigali', price: 300 },
  { id: 2, title: 'Cozy Studio in Nyamirambo', price: 150 },
  { id: 3, title: '4BR Villa with Garden - Kacyiru', price: 700 }
];

// API route
app.get('/api/houses', (req, res) => {
  res.json(houses);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
