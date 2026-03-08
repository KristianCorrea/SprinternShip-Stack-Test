// -------------------------------------------------
// REST routes for the "items" resource.
//
// GET    /items      → list all items
// POST   /items      → create a new item
// DELETE /items/:id  → delete an item by id
// -------------------------------------------------

const { Router } = require("express");
const pool = require("../db");

const router = Router();

// GET /items — return every item, newest first
router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM items ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /items error:", err.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// POST /items — create a new item from { name } in the request body
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO items (name) VALUES ($1) RETURNING *",
      [name.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("POST /items error:", err.message);
    res.status(500).json({ error: "Failed to create item" });
  }
});

// DELETE /items/:id — remove a single item by its id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query("DELETE FROM items WHERE id = $1", [
      id,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(`DELETE /items/${id} error:`, err.message);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
