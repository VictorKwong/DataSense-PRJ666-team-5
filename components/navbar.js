import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { userAtom } from "../store/store";
import { useAtom } from "jotai";
import { removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    setUser(undefined);
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  // Check if the current path is Home, Login, or Register
  const isHomeOrAuthPage = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/privacy"
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
            style={{ marginRight: "15px", transition: "transform 0.3s" }}
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
              {/* If the user is logged in, show all links */}
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
                      <i className="fas fa-chart-pie me-1"></i>
                      Interactive Hub
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/info-hub" className="nav-link link-hover">
                    <i className="fa fa-circle-info me-1"></i>
                      Info Hub
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/alert" className="nav-link link-hover">
                      <i className="fa fa-bell me-1"></i> Alert
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/account-settings" className="nav-link link-hover">
                      <i className="fas fa-cog me-1"></i> Settings
                    </Link>
                  </li>
                </>
              ) : (
                // Show only the Home link if on Home, Login, or Register page
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
                        <i className="fa fa-solid fa-phone me-1"></i> Contact
                      </Link>
                    </li>
                  </>
                )
              )}
            </ul>

            <div className="d-flex align-items-center ms-auto">
              <div className="ms-auto d-flex align-items-center">
                <FiBell size={24} className="ms-3" />
                <FiUser size={24} className="me-2" />
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
                    onClick={handleRegister}
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
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          max-height: 120px;
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
          color: #17a2b8;
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
