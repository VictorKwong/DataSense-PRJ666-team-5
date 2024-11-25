import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="footer text-center text-lg-start"
      style={{
        backgroundColor: "#111827",
        color: "white",
        padding: "40px 0",
        width: "100%",
      }}
    >
      {/* Footer Content */}
      <div className="container p-4">
        <div className="row justify-content-center">
          {/* Column 1 */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-left">
            <h5 className="text-uppercase">My Website</h5>
            <p>
              Your one-stop solution for managing data and devices with ease.
              Stay connected and informed with our platform.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0 text-left">
            <h5 className="text-uppercase">Quick Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <Link href="/" className="text-white">
                  Home
                </Link>
                
              </li>
              <li>
                <Link href="/about" className="text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Social Media */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 text-left">
            <h5 className="text-uppercase">Follow Us</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-white">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: "#0f172a" }}>
        <p>© 2024 My Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
