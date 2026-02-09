import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">

          {/* LEFT */}
          <div className="nav-left">
            <h1 className="nav-title">
              <span>🌱</span> GreenMeter
            </h1>
          </div>

          {/* CENTER */}
          <ul className="nav-center">
            <li>Home</li>
            <li>Features</li>
            <li>How it Works</li>
            <li>Blog</li>
            <li>FAQs</li>
          </ul>

          {/* RIGHT */}
          <div className="nav-right">
            <Link to="/login">
              <button className="login-btn">Log In</button>
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            ☰
          </div>

        </div>
      </nav>

      {/* MOBILE SLIDE MENU */}
      <div className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setMenuOpen(false)}>✕</div>

        <ul>
          <li onClick={() => setMenuOpen(false)}>Home</li>
          <li onClick={() => setMenuOpen(false)}>Features</li>
          <li onClick={() => setMenuOpen(false)}>How it Works</li>
          <li onClick={() => setMenuOpen(false)}>Blog</li>
          <li onClick={() => setMenuOpen(false)}>FAQs</li>
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Log In
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
