import Link from "next/link";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import Script from "next/script";
import { useSession, signIn, signOut } from "next-auth/react";
import { userAtom } from "../store/store";
import { useAtom } from "jotai";
import { removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

const Navbar = () => {
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
  const [isOpen, setIsOpen] = useState(false);
  const { data: sessionData, status: sessionStatus } = useSession();

  console.log({ sessionData, sessionStatus });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right-aligned section */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          {/* Your nav items */}
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* Search, notifications, and user login/logout as before */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
