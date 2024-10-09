export default function SimpleItem({ className, title, icon, children }) {
  return (
    <li
      className={`p-2 m-1 ${className ?? ""}`}
      style={{
        cursor: "pointer",
        border: "1px solid grey",
        borderRadius: 9,
        listStyle: "none",
      }}
    >
      <h3 style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{title}</span>
        <span>{icon}</span>
      </h3>
      {children}
    </li>
  );
}
