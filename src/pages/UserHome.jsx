import { useEffect, useState } from "react";
import DashboardUserNavbar from "../components/DashboardUserNavbar";
import "./userhome.css";

export default function UserHome() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (mode) => {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <>
      <DashboardUserNavbar theme={theme} toggleTheme={toggleTheme} />

      <div className="userhome-wrapper">

        <header className="uh-header">
          <h1>Welcome Back 👋</h1>
          <p>Your personalized sustainability dashboard</p>
        </header>

        <div className="uh-grid">

          <div className="uh-card">
            <div className="uh-icon">🌿</div>
            <h3>Carbon Score</h3>
            <p className="uh-value">135 pts</p>
            <span>Eco-impact rating</span>
          </div>

          <div className="uh-card">
            <div className="uh-icon">📈</div>
            <h3>Weekly Progress</h3>
            <p className="uh-value">+12%</p>
            <span>Efficiency growth</span>
          </div>

          <div className="uh-card">
            <div className="uh-icon">🤖</div>
            <h3>AI Insights</h3>
            <p className="uh-value">4 Tips</p>
            <span>Personal tips</span>
          </div>

          <div className="uh-card">
            <div className="uh-icon">🎯</div>
            <h3>Goals Completed</h3>
            <p className="uh-value">7/10</p>
            <span>Keep going!</span>
          </div>

        </div>

      </div>
    </>
  );
}
