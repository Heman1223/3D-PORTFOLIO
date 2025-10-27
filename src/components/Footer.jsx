import React from "react";
import "../styles/global.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Kapil Khandelwal. All rights reserved.</p>
        <div className="social-links">
          <a href="#" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href="#" aria-label="Twitter">
            Twitter
          </a>
          <a href="#" aria-label="Instagram">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
