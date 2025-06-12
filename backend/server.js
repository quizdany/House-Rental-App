const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Example static house data
const houses = [
  { id: 1, title: 'Modern Apartment in Kigali', price: 400 },
  { id: 2, title: 'Spacious House in Kacyiru', price: 800 },
  { id: 3, title: 'Budget Room in Nyamirambo', price: 150 },
];

// Root route (optional)
app.get('/', (req, res) => {
  res.send('🏠 House Rental API is running!');
});

// Main API route
app.get('/api/houses', (req, res) => {
  res.json(houses);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
