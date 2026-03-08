// -------------------------------------------------
// Entry point for the Express backend.
//
// 1. Loads environment variables from .env
// 2. Creates the "items" table if it doesn't exist
// 3. Mounts routes and starts listening
// -------------------------------------------------

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const itemsRouter = require("./routes/items");

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---------------------------------------------------
// cors()          → allows the frontend (different origin) to call us
// express.json()  → parses incoming JSON request bodies
app.use(cors());
app.use(express.json());

// --- Routes -------------------------------------------------------
app.use("/items", itemsRouter);

// Health-check endpoint (useful for Render deploys)
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

// --- Database bootstrap & server start ----------------------------
// Automatically create the "items" table on first run so students
// don't need to run a separate migration step.
async function start() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id         SERIAL PRIMARY KEY,
        name       TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ Database ready — "items" table exists');

    app.listen(PORT, () => {
      console.log(`✓ Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("✗ Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
