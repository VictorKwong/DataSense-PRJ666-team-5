// Header.js
import Navbar from "./navbar";
import LogoIma from "@/public/assets/images/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header className="header bg-light py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="logo">
          <Image
            src={LogoIma}
            alt="Website Logo"
            width={120}
            height={120}
            className="img-fluid" // Makes the image responsive
          />
        </div>
        <Navbar />
      </div>
    </header>
  );
}
