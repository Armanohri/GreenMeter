import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <>
      <div className="scroll-progress"></div>

      <nav className="navbar">
        <div className="nav-inner">

          {/* LEFT LOGO */}
          <div className="nav-left">
            <h1 className="nav-title">🌱 GreenMeter</h1>
          </div>

          {/* CENTER */}
          <ul className="nav-center">
            <li>Home</li>
            <li>Features</li>
            <li>How it Works</li>
            <li>Blog</li>
            <li>FAQs</li>
          </ul>

          {/* RIGHT BUTTONS */}
          <div className="nav-right">
            <button className="icon-btn" onClick={toggleTheme}>
              <span className="icon">{darkMode ? "☀️" : "🌙"}</span>
            </button>

            {/* HELP → FAQ DRAWER */}
            <button className="icon-btn" onClick={() => setFaqOpen(true)}>
              <span className="icon">❔</span>
            </button>

            <button className="login-btn">
              Log In <span className="arrow">▾</span>
            </button>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            ☰
          </div>
        </div>
      </nav>

      {/* FAQ DRAWER */}
      <div className={`faq-drawer ${faqOpen ? "open" : ""}`}>
        <div className="faq-header">
          <h2>❔ Help & FAQs</h2>
          <span className="faq-close" onClick={() => setFaqOpen(false)}>✕</span>
        </div>

        <div className="faq-content">
          <div className="faq-item">👉 How does GreenMeter calculate CO₂?</div>
          <div className="faq-item">👉 How do I connect my devices?</div>
          <div className="faq-item">👉 How does the AI recommendation work?</div>
          <div className="faq-item">👉 How do I track my daily usage?</div>
          <div className="faq-item">👉 Why is my score low?</div>
          <div className="faq-item">👉 How do I improve my efficiency?</div>
          <div className="faq-item">👉 Contact Support</div>
        </div>
      </div>

      {/* FAQ OVERLAY */}
      {faqOpen && <div className="faq-overlay" onClick={() => setFaqOpen(false)}></div>}

      {/* MOBILE PANEL */}
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
