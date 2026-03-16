import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./DashboardNavbar.css";

export default function DashboardNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="dashboard-navbar">
        <div className="dash-nav-inner">
          <h1 className="dash-nav-title">🌱 Dashboard</h1>

          <ul className="dash-nav-links">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={toggleTheme}>{darkMode ? "Light Mode" : "Dark Mode"}</li>
            <li onClick={() => setFaqOpen(true)}>FAQs</li>
            <li onClick={logout} className="dash-logout">Logout</li>
          </ul>
        </div>
      </nav>

      {/* FAQ */}
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
          <div className="faq-item">👉 How to improve my score?</div>
        </div>
      </div>

      {faqOpen && <div className="faq-overlay" onClick={() => setFaqOpen(false)}></div>}
    </>
  );
}
