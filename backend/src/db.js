// -------------------------------------------------
// Database connection using the "pg" library.
//
// We read DATABASE_URL from environment variables so
// the same code works locally (Docker Postgres) and
// in production (Neon).
// -------------------------------------------------

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
