// Navbar.js
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FiBell, FiUser } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { userAtom } from "../store/store";
import { useAtom } from "jotai";
import { removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

const Navbar = ({ notifications, clearNotifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    setUser(undefined);
    router.push("/login");
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const goToAccountSettings = () => {
    router.push("/account-settings");
  };

  const isHomeOrAuthPage = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].includes(router.pathname);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light shadow-sm"
      style={{ height: "120px" }}
    >
      <div
        className="container-fluid d-flex align-items-center"
        style={{ height: "100%" }}
      >
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/assets/images/logo.png"
            alt="DataSense Logo"
            width={100}
            height={100}
            className="logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              DataSense
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link href="/dashboard" className="nav-link link-hover">
                      <i className="fa-sharp fa-solid fa-table-columns me-1"></i>{" "}
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/data" className="nav-link link-hover">
                      <i className="fas fa-database me-1"></i> Data
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/devices" className="nav-link link-hover">
                      <i className="fas fa-laptop me-1"></i> Devices
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/interactivedatahub"
                      className="nav-link link-hover"
                    >
                      <i className="fas fa-chart-pie me-1"></i> Interactive Hub
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/info-hub" className="nav-link link-hover">
                      <i className="fas fa-info-circle me-1"></i> Info Hub
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/alert" className="nav-link link-hover">
                      <i className="fas fa-bell me-1"></i> Alerts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/account-settings"
                      className="nav-link link-hover"
                    >
                      <i className="fas fa-cog me-1"></i> Account Settings
                    </Link>
                  </li>
                </>
              ) : (
                isHomeOrAuthPage && (
                  <>
                    <li className="nav-item">
                      <Link href="/" className="nav-link link-hover">
                        <i className="fas fa-home me-1"></i> Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/about" className="nav-link link-hover">
                        <i className="fa fa-address-card me-1"></i> About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/contact" className="nav-link link-hover">
                        <i className="fa fa-phone me-1"></i> Contact
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/privacy" className="nav-link link-hover">
                        <i className="fa fa-user-shield me-1"></i> Privacy
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/terms" className="nav-link link-hover">
                        <i className="fa fa-file-contract me-1"></i> Terms &
                        Conditions
                      </Link>
                    </li>
                  </>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center">
          {user && (
            <div
              className="notification-bell position-relative"
              onClick={toggleNotifications}
            >
              <FiBell size={24} className="ms-3" />
              {notifications.length > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {notifications.length}
                </span>
              )}
            </div>
          )}

          {showNotifications && (
            <div className="notification-dropdown">
              <h6 className="d-flex justify-content-between align-items-center">
                Notifications
                <button
                  className="btn btn-sm btn-danger"
                  onClick={clearNotifications}
                >
                  Clear All
                </button>
              </h6>
              <div className="notification-content">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="alert alert-info">
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <p>No notifications</p>
                )}
              </div>
            </div>
          )}

          {user && (
            <FiUser
              size={24}
              className="me-2"
              onClick={goToAccountSettings}
              style={{ cursor: "pointer" }}
            />
          )}

          {user ? (
            <>
              <span className="nav-link">{user.email}</span>
              <button
                className="btn btn-danger ms-2"
                onClick={handleLogout}
                style={{ transition: "all 0.3s" }}
              >
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </>
          ) : router.pathname === "/login" ? (
            <button
              className="btn btn-success"
              onClick={() => router.push("/register")}
              style={{ transition: "all 0.3s" }}
            >
              <i className="fas fa-sign-in-alt me-1"></i> Register
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => router.push("/login")}
              style={{ transition: "all 0.3s" }}
            >
              <i className="fas fa-sign-in-alt me-1"></i> Login
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          max-height: 120px;
        }
        .navbar-brand:hover .logo {
          transform: rotate(360deg);
        }
        .nav-link:hover {
          color: #17a2b8;
        }
        .notification-bell {
          cursor: pointer;
          position: relative;
        }
        .notification-dropdown {
          width: 300px;
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 10px;
          background: white;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 1rem;
        }
        .notification-content {
          max-height: 200px;
          overflow-y: auto;
        }
        .badge {
          font-size: 0.75em;
          padding: 4px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
