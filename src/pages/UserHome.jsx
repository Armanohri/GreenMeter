import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Userhome.css";

export default function UserHome() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUser(data.user);
          setUserData(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="userhome-wrapper">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="userhome-wrapper">
      {/* User Info Section (Top) */}
      <div className="user-info-section">
        <div className="user-info-content">
          <div className="user-greeting">
            <h1>Welcome back, {user || "User"}! 👋</h1>
            <p>Track your carbon footprint and make a positive impact</p>
          </div>
          <div className="user-actions">
            <button className="profile-btn" onClick={() => alert("Profile settings coming soon!")}>
              Profile
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Carbon Calculator Shortcut */}
      <div className="dashboard-section">
        <div className="carbon-calculator-card">
          <div className="calculator-icon">🌍</div>
          <div className="calculator-content">
            <h2>Carbon Calculator</h2>
            <p>Calculate your carbon footprint from daily activities</p>
            <button className="calculator-btn" onClick={() => alert("Carbon Calculator coming soon!")}>
              Calculate Now
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Stats Panel */}
      <div className="dashboard-section">
        <h2 className="section-title">Your Dashboard Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <h3>Total CO₂ Saved</h3>
            <div className="stat-value">1,245 kg</div>
            <span className="stat-change positive">+12% this month</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <h3>Eco Score</h3>
            <div className="stat-value">87/100</div>
            <span className="stat-change positive">+5 points</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚗</div>
            <h3>Transport Impact</h3>
            <div className="stat-value">342 kg</div>
            <span className="stat-change negative">-8% reduction</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <h3>Energy Saved</h3>
            <div className="stat-value">2,450 kWh</div>
            <span className="stat-change positive">+15% this month</span>
          </div>
        </div>
      </div>

      {/* Transport Comparison Tool */}
      <div className="dashboard-section">
        <h2 className="section-title">Transport Comparison</h2>
        <div className="transport-comparison">
          <div className="transport-card">
            <div className="transport-icon">🚗</div>
            <h3>Car</h3>
            <div className="transport-stats">
              <div className="transport-stat">
                <span>CO₂: 120g/km</span>
              </div>
              <div className="transport-stat">
                <span>Cost: $0.15/km</span>
              </div>
            </div>
          </div>
          <div className="transport-card recommended">
            <div className="transport-icon">🚲</div>
            <h3>Bicycle</h3>
            <div className="transport-stats">
              <div className="transport-stat">
                <span>CO₂: 0g/km</span>
              </div>
              <div className="transport-stat">
                <span>Cost: $0.00/km</span>
              </div>
            </div>
            <div className="recommended-badge">Recommended</div>
          </div>
          <div className="transport-card">
            <div className="transport-icon">🚇</div>
            <h3>Public Transit</h3>
            <div className="transport-stats">
              <div className="transport-stat">
                <span>CO₂: 14g/km</span>
              </div>
              <div className="transport-stat">
                <span>Cost: $0.05/km</span>
              </div>
            </div>
          </div>
          <div className="transport-card">
            <div className="transport-icon">🚶</div>
            <h3>Walking</h3>
            <div className="transport-stats">
              <div className="transport-stat">
                <span>CO₂: 0g/km</span>
              </div>
              <div className="transport-stat">
                <span>Cost: $0.00/km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Tracker */}
      <div className="dashboard-section">
        <h2 className="section-title">Your Goals</h2>
        <div className="goals-container">
          <div className="goal-card">
            <div className="goal-header">
              <h3>Reduce CO₂ by 20%</h3>
              <span className="goal-progress">65%</span>
            </div>
            <div className="goal-progress-bar">
              <div className="goal-progress-fill" style={{ width: "65%" }}></div>
            </div>
            <p className="goal-description">Target: 500 kg reduction by end of month</p>
          </div>
          <div className="goal-card">
            <div className="goal-header">
              <h3>Use Public Transport 15x</h3>
              <span className="goal-progress">80%</span>
            </div>
            <div className="goal-progress-bar">
              <div className="goal-progress-fill" style={{ width: "80%" }}></div>
            </div>
            <p className="goal-description">12 out of 15 trips completed</p>
          </div>
          <div className="goal-card">
            <div className="goal-header">
              <h3>Plant 5 Trees</h3>
              <span className="goal-progress">40%</span>
            </div>
            <div className="goal-progress-bar">
              <div className="goal-progress-fill" style={{ width: "40%" }}></div>
            </div>
            <p className="goal-description">2 out of 5 trees planted</p>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="dashboard-section">
        <h2 className="section-title">Global Leaderboard</h2>
        <div className="leaderboard-container">
          <div className="leaderboard-item top">
            <div className="leaderboard-rank">🥇</div>
            <div className="leaderboard-info">
              <h4>Eco Champion</h4>
              <p>5,420 kg CO₂ saved</p>
            </div>
            <div className="leaderboard-score">9,850 pts</div>
          </div>
          <div className="leaderboard-item top">
            <div className="leaderboard-rank">🥈</div>
            <div className="leaderboard-info">
              <h4>Green Warrior</h4>
              <p>4,890 kg CO₂ saved</p>
            </div>
            <div className="leaderboard-score">8,920 pts</div>
          </div>
          <div className="leaderboard-item top">
            <div className="leaderboard-rank">🥉</div>
            <div className="leaderboard-info">
              <h4>Earth Lover</h4>
              <p>4,210 kg CO₂ saved</p>
            </div>
            <div className="leaderboard-score">7,650 pts</div>
          </div>
          <div className="leaderboard-item current">
            <div className="leaderboard-rank">#28</div>
            <div className="leaderboard-info">
              <h4>You</h4>
              <p>1,245 kg CO₂ saved</p>
            </div>
            <div className="leaderboard-score">2,340 pts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
