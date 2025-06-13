// === Updated Backend: server.js ===
// === Updated Backend: server.js ===
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://house_rental_db_c684_user:HwRmgr3EpVQJvBVfW6RkuAfvpZgnfF3l@dpg-d15koeumcj7s73br6qeg-a.oregon-postgres.render.com/house_rental_db_c684'
});

// === Routes ===
app.get('/', (req, res) => {
  res.send('Welcome to HomeLink Rwanda API');
});

// Fetch all houses
app.get('/api/houses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM houses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Smart matching based on budget, location, preferences
app.post('/api/match', async (req, res) => {
  const { budget, location, bedrooms } = req.body;
  try {
    const result = await pool.query(
      'SELECT *, ABS(rent - $1) as rank FROM houses WHERE location = $2 AND bedrooms >= $3 ORDER BY rank LIMIT 10',
      [budget, location, bedrooms]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rent prediction endpoint (dummy logic for now)
app.post('/api/predict-rent', async (req, res) => {
  const { location, size, bedrooms } = req.body;
  // Placeholder prediction
  const predicted = 500 + bedrooms * 50 + size * 2;
  res.json({ predictedRent: predicted });
});

// Post and fetch tenant reviews
app.post('/api/review', async (req, res) => {
  const { houseId, reviewer, rating, comment } = req.body;
  try {
    await pool.query(
      'INSERT INTO reviews (house_id, reviewer, rating, comment) VALUES ($1, $2, $3, $4)',
      [houseId, reviewer, rating, comment]
    );
    res.json({ message: 'Review posted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/reviews/:houseId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM reviews WHERE house_id = $1',
      [req.params.houseId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Landlord dashboard analytics (basic)
app.get('/api/landlord/:landlordId/stats', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) as listings, AVG(rent) as avg_rent FROM houses WHERE landlord_id = $1',
      [req.params.landlordId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// === You’ll need to create tables: houses, reviews, landlords in PostgreSQL ===
