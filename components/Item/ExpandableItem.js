import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

export default function ExpandableItem({ title, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li
      className="p-2 m-1"
      style={{
        cursor: "pointer",
        border: "1px solid grey",
        borderRadius: 9,
        listStyle: "none",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <h3 style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{title}</span>
        <span>
          {expanded ? (
            <i className="fa-solid fa-minus"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </span>
      </h3>
      {expanded ? children : null}
    </li>
  );
}
