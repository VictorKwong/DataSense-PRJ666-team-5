import Link from "next/link";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: sessionData, status: sessionStatus } = useSession(); // Get session status

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light shadow-sm"
      style={{ height: "120px" }}
    >
      <div
        className="container-fluid d-flex align-items-center"
        style={{ height: "100%" }}
      >
        {/* Logo with a larger size */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/assets/images/logo.png"
            alt="DataSense Logo"
            style={{
              width: "100px", // Set width to 100px
              height: "100px", // Set height to 100px
              marginRight: "15px",
              transition: "transform 0.3s",
            }}
            className="logo"
          />
          <span className="h3 mb-0"></span>{" "}
          {/* Name aligned with the larger logo */}
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="navbar-toggler order-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas (pop-out sidebar) for collapsed navigation */}
        <div
          className="offcanvas offcanvas-start"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              DataSense
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {/* Sidebar Menu Items */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/" className="nav-link link-hover">
                  <i className="fas fa-home me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link link-hover">
                  <i className="fas fa-user-circle me-1"></i> Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/devices" className="nav-link link-hover">
                  <i className="fas fa-laptop me-1"></i> Your Devices
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/notifications" className="nav-link link-hover">
                  <i className="fa fa-bell me-1"></i> Notifications
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/data" className="nav-link link-hover">
                  <i className="fas fa-database me-1"></i> Your Data
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard" className="nav-link link-hover">
                  <i className="fa-sharp fa-solid fa-table-columns me-1"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                {/* New Interactive Data Hub Link */}
                <Link href="/interactivedatahub" className="nav-link link-hover">
                  <i className="fas fa-chart-pie me-1"></i>
                  Interactive Data Hub
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/settings" className="nav-link link-hover">
                  <i className="fas fa-cog me-1"></i> Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* User Info and Auth Buttons */}
        <div className="ms-auto order-lg-2 d-flex align-items-center">
          {/* Conditional Login/Logout Button */}
          {sessionData ? (
            <>
              <span className="nav-link">
                <i className="fas fa-user me-2"></i>
                {sessionData.user.name}
              </span>
              <button
                className="btn btn-danger ms-2"
                onClick={() => signOut()}
                style={{ transition: "all 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => signIn("google")}
              style={{ transition: "all 0.3s" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <i className="fas fa-sign-in-alt me-1"></i> Login
            </button>
          )}
        </div>
      </div>

      {/* Custom styles for hover and interactivity */}
      <style jsx>{`
        .navbar {
          max-height: 120px; /* Limit navbar height */
        }
        .navbar-brand {
          transition: all 0.3s;
        }
        .navbar-brand:hover .logo {
          transform: rotate(360deg);
        }
        .nav-link {
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #17a2b8; /* Custom hover color */
        }
        .link-hover:hover {
          background-color: #f8f9fa;
          padding-left: 5px;
          transition: padding-left 0.2s;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
