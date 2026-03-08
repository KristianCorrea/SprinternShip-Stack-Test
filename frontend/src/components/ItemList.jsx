export default function ItemList({ items, onDelete }) {
  if (items.length === 0) {
    return <p style={{ color: "#888" }}>No items yet. Add one above!</p>;
  }

  return (
    <ul style={styles.list}>
      {items.map((item) => (
        <li key={item.id} style={styles.item}>
          <span style={styles.name}>{item.name}</span>
          <button onClick={() => onDelete(item.id)} style={styles.deleteBtn}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    marginBottom: 8,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  name: {
    fontSize: "1rem",
  },
  deleteBtn: {
    padding: "6px 12px",
    fontSize: "0.85rem",
    background: "transparent",
    color: "#d32f2f",
    border: "1px solid #d32f2f",
    borderRadius: 6,
    cursor: "pointer",
  },
};
