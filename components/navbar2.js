import { FiBell, FiUser } from "react-icons/fi";
import Link from "next/link";
import { userAtom } from "../store/store";
import { useAtom } from "jotai";
import { removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    setUser(undefined);
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register"); // Navigate to the registration page
  };

  return (
    <nav>
      <div className="bd-highlight d-flex d-inline justify-content-between align-items-center">
        <ul
          className="navbar-nav ms-auto  align-items-center"
          style={{ display: "flex", flexDirection: "row", gap: 10 }}
        >
          <li className="nav-item d-flex border d-flex rounded">
            <input
              className="form-control-plaintext"
              style={{ padding: "0 5px" }}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="border-0 bg-transparent shadow-none">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </li>
          {/* Notification Icon */}
          <li className="nav-item">
            <FiBell size={24} />
          </li>

          {/* User Icon */}
          <li className="nav-item d-flex align-items-center">
            <FiUser size={24} className="me-2" />
            {user ? (
              <button
                className="nav-link"
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : // Conditionally render Register button if on login page, otherwise show Login
            router.pathname === "/login" ? (
              <button
                className="nav-link"
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={handleRegister} // Navigate to register page
              >
                Register
              </button>
            ) : (
              <button
                className="nav-link"
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/login")} // Navigate to login page
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
