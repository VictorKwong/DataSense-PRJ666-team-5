import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Feather icons for hamburger and close buttons
import styles from "../styles/sidebar.module.css"; // Import your CSS file for styling
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log(isOpen ? "Opening Sidebar" : "Closing Sidebar");
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : styles.sidebarClose
        }`}
      >
        <aside className="sidebar">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/data">Data</Link>
            </li>
            <li>
              <Link href="/devices">Devices</Link>
            </li>
            <li>
              <Link href="/notifications">Notifications</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
