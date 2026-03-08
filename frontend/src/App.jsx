import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

// The backend URL comes from an environment variable so the same
// code works locally (http://localhost:3001) and in production
// (your Render URL).  Vite exposes env vars prefixed with VITE_.
const API = import.meta.env.VITE_BACKEND_API_URL;

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch all items from the backend ---
  async function fetchItems() {
    try {
      setError(null);
      const res = await fetch(`${API}/items`);
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Load items once on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // --- Create a new item ---
  async function handleCreate(name) {
    try {
      setError(null);
      const res = await fetch(`${API}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const newItem = await res.json();
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  // --- Delete an item by id ---
  async function handleDelete(id) {
    try {
      setError(null);
      const res = await fetch(`${API}/items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Items App</h1>
        <p style={styles.subtitle}>
          Full-stack demo &mdash; React + Express + PostgreSQL
        </p>

        <ItemForm onCreate={handleCreate} />

        {error && <p style={styles.error}>{error}</p>}

        {loading ? (
          <p style={styles.loading}>Loading items…</p>
        ) : (
          <ItemList items={items} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

// Inline styles keep the demo self-contained (no CSS files to manage).
const styles = {
  wrapper: {
    minHeight: "100vh",
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: "#f4f5f7",
    display: "flex",
    justifyContent: "center",
    paddingTop: "4rem",
  },
  container: {
    width: "100%",
    maxWidth: 520,
    padding: "0 1rem",
  },
  title: {
    margin: 0,
    fontSize: "1.75rem",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 24,
    color: "#666",
    fontSize: "0.95rem",
  },
  error: {
    color: "#d32f2f",
    background: "#fdecea",
    padding: "8px 12px",
    borderRadius: 6,
    fontSize: "0.9rem",
  },
  loading: {
    color: "#888",
  },
};
