const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL SSL
  },
});

// Routes
app.get('/api/houses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM houses ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching houses:', err);
    res.status(500).send('Server error');
  }
});

// Root route (optional health check)
app.get('/', (req, res) => {
  res.send('House Rental App Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
