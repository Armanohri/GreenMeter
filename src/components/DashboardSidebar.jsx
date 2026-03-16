import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardSidebar.css";

export default function DashboardSidebar({ onLogout }) {
  const navigate = useNavigate();

  const items = [
    { id: "top", label: "Dashboard", icon: "📊" },
    { id: "carbon", label: "Carbon Calculator", icon: "🌍" },
    { id: "stats", label: "Dashboard Stats", icon: "📈" },
    { id: "transport", label: "Transport Comparison", icon: "🚗" },
    { id: "goals", label: "Goal Tracker", icon: "🎯" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
    { id: "history", label: "Saved Records", icon: "📁" },
  ];

  const [darkMode, setDarkMode] = useState(false);
  const [tipsActive, setTipsActive] = useState({});

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }

    // Tips: only pulse dots on first ever dashboard visit
    const visited = localStorage.getItem("hasVisitedDashboard");
    if (!visited) {
      const initialTips = {};
      items.forEach((item) => {
        initialTips[item.id] = true;
      });
      setTipsActive(initialTips);
      localStorage.setItem("hasVisitedDashboard", "true");
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

  const scrollToSection = (id) => {
    const targetId = id === "top" ? "top-dashboard" : id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Stop blinking for this section once it has been visited
    setTipsActive((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar-inner">
        <div className="dash-sidebar-logo">
          <span className="logo-icon">🌱</span>
          <div className="logo-text">
            <span>GreenMeter</span>
            <small>Dashboard</small>
          </div>
        </div>

        <button className="dash-sidebar-theme" onClick={toggleTheme}>
          <span className="link-icon">{darkMode ? "☀️" : "🌙"}</span>
          <span className="link-label">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <nav className="dash-sidebar-nav">
          {items.map((item) => (
            <button
              key={item.id}
              className="dash-sidebar-link"
              onClick={() => scrollToSection(item.id)}
            >
              <span className="link-icon">{item.icon}</span>
              <span className="link-label">{item.label}</span>
              <span
                className={
                  "link-indicator" + (tipsActive[item.id] ? " pulsing" : "")
                }
              />
            </button>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <button className="dash-sidebar-logout" onClick={handleLogout}>
            <span className="link-icon">🚪</span>
            <span className="link-label">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}


