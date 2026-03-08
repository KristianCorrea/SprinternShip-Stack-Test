import { useState } from "react";

export default function ItemForm({ onCreate }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="New item name…"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: 6,
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
