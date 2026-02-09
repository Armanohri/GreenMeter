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
    const isDark = body.classList.contains("dark");

    if (isDark) {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // Smooth Scroll
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">

          {/* LOGO */}
          <div className="nav-left">
            <h1 className="nav-title">🌱 GreenMeter</h1>
          </div>

          {/* NAV LINKS */}
          <ul className="nav-center">
            <li onClick={() => scrollToSection("home")}>Home</li>

            {/* 🔥 REMOVED LOGIN CHECK HERE */}
            <li onClick={() => scrollToSection("features")}>Features</li>

            {/* 🔥 REMOVED LOGIN CHECK HERE */}
            <li onClick={() => scrollToSection("howitworks")}>How it Works</li>

            {/* 🔥 REMOVED LOGIN CHECK HERE */}
            <li onClick={() => scrollToSection("blog")}>Blog</li>

            <li onClick={() => setFaqOpen(true)}>FAQs</li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="nav-right">
            <button className="icon-btn" onClick={toggleTheme}>
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button className="icon-btn" onClick={() => setFaqOpen(true)}>
              ❔
            </button>

            <Link to="/login" className="login-btn">
              Log In
            </Link>
          </div>

          {/* MOBILE MENU ICON */}
          <div className="hamburger" onClick={() => setMenuOpen(true)}>☰</div>
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
        </div>
      </div>

      {faqOpen && <div className="faq-overlay" onClick={() => setFaqOpen(false)}></div>}

      {/* MOBILE MENU */}
      <div className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setMenuOpen(false)}>✕</div>

        <ul>
          <li onClick={() => { scrollToSection("home"); setMenuOpen(false); }}>Home</li>
          <li onClick={() => { scrollToSection("features"); setMenuOpen(false); }}>Features</li>
          <li onClick={() => { scrollToSection("howitworks"); setMenuOpen(false); }}>How it Works</li>
          <li onClick={() => { scrollToSection("blog"); setMenuOpen(false); }}>Blog</li>
          <li onClick={() => { setFaqOpen(true); setMenuOpen(false); }}>FAQs</li>
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
