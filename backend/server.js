const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// PostgreSQL pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Needed for Render
  },
});

// Route to get all houses
app.get("/api/houses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM houses ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Route to add a new house
app.post("/api/houses", async (req, res) => {
  const { title, location, price, image_url } = req.body;

  if (!title || !location || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO houses (title, location, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, location, price, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding house:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
