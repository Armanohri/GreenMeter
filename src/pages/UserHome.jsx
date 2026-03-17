import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import "./Userhome.css";
import CarbonCalculator from "../components/CarbonCalculator";

export default function UserHome() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    targetValue: "",
    unit: "kg CO₂",
    deadline: "",
    category: "carbon",
  });
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

  const openGoalModal = () => {
    setGoalModalOpen(true);
  };

  const closeGoalModal = () => {
    setGoalModalOpen(false);
    setNewGoal({
      title: "",
      targetValue: "",
      unit: "kg CO₂",
      deadline: "",
      category: "carbon",
    });
  };

  const handleGoalChange = (field, value) => {
    setNewGoal((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetValue) {
      alert("Please add a goal name and target.");
      return;
    }
    const goal = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
    };
    setGoals((prev) => [...prev, goal]);
    closeGoalModal();
  };

  if (loading) {
    return (
      <div className="dash-layout">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-layout">
      <DashboardSidebar onLogout={handleLogout} />
      <div className="userhome-wrapper">
        {/* User Info Section (Top) */}
      <div className="user-info-section" id="top-dashboard">
        <div className="user-info-content">
          <div className="user-greeting">
            <h1>Welcome back, {user || "User"}! 👋</h1>
            <p>Track your carbon footprint and make a positive impact</p>
          </div>
          <div className="user-actions">
            <div className="profile-wrapper">
              <button
                className="profile-btn"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                Profile ▾
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <button
                    className="profile-menu-item"
                    onClick={() => {
                      setProfileOpen(false);
                      alert("Profile settings coming soon!");
                    }}
                  >
                    👤 Profile Settings
                  </button>
                  <button
                    className="profile-menu-item"
                    onClick={() => {
                      setProfileOpen(false);
                      alert("Account details coming soon!");
                    }}
                  >
                    🔐 Security & Login
                  </button>
                  <button
                    className="profile-menu-item"
                    onClick={() => {
                      setProfileOpen(false);
                      alert("Notification settings coming soon!");
                    }}
                  >
                    🔔 Notifications
                  </button>
                  <button
                    className="profile-menu-item"
                    onClick={() => {
                      setProfileOpen(false);
                      alert("Theme settings coming soon!");
                    }}
                  >
                    🎨 Appearance & Theme
                  </button>
                  <button
                    className="profile-menu-item profile-menu-logout"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Carbon Calculator */}
      <div className="dashboard-section" id="carbon">
        <CarbonCalculator />
      </div>

      {/* Dashboard Stats Panel */}
      <div className="dashboard-section" id="stats">
        <h2 className="section-title">Your Dashboard Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <h3>Total CO₂ Saved</h3>
            <div className="stat-value">0 kg</div>
            <span className="stat-change neutral">No data yet</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <h3>Eco Score</h3>
            <div className="stat-value">0 / 100</div>
            <span className="stat-change neutral">No data yet</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚗</div>
            <h3>Transport Impact</h3>
            <div className="stat-value">0 kg</div>
            <span className="stat-change neutral">No data yet</span>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <h3>Energy Saved</h3>
            <div className="stat-value">0 kWh</div>
            <span className="stat-change neutral">No data yet</span>
          </div>
        </div>
      </div>

      {/* Transport Comparison Tool */}
      <div className="dashboard-section" id="transport">
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
      <div className="dashboard-section" id="goals">
        <h2 className="section-title">Your Goals</h2>
        <div className="goals-container">
          {goals.map((goal) => (
            <div className="goal-card" key={goal.id}>
              <div className="goal-header">
                <h3>{goal.title}</h3>
                <span className="goal-progress">{goal.progress}%</span>
              </div>
              <div className="goal-progress-bar">
                <div
                  className="goal-progress-fill"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="goal-description">
                Target: {goal.targetValue} {goal.unit}
                {goal.deadline && ` · by ${goal.deadline}`}
              </p>
            </div>
          ))}

          <div className="goal-card goal-card-empty">
            <button className="goal-add-btn" onClick={openGoalModal}>
              <span className="goal-add-icon">＋</span>
              <span className="goal-add-text">
                {goals.length === 0 ? "Add your first goal" : "Add another goal"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="dashboard-section" id="leaderboard">
        <h2 className="section-title">Global Leaderboard</h2>
        <div className="leaderboard-container">
          <div className="leaderboard-item leaderboard-empty">
            <div className="leaderboard-info">
              <h4>No leaderboard data yet</h4>
              <p>Start tracking your activities to appear on the leaderboard.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Saved Records / History placeholder */}
      <div className="dashboard-section" id="history">
        <h2 className="section-title">Saved Records & History</h2>
        <div className="history-card">
          <p>No records saved yet. Calculate your footprint and save results to see them here.</p>
        </div>
      </div>

      {goalModalOpen && (
        <div className="goal-modal-backdrop" onClick={closeGoalModal}>
          <div
            className="goal-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Create a new goal</h3>
            <p className="goal-modal-sub">
              Set a clear, measurable sustainability target you want to achieve.
            </p>
            <form onSubmit={handleGoalSubmit} className="goal-form">
              <label>
                Goal name
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => handleGoalChange("title", e.target.value)}
                  placeholder="e.g. Reduce home electricity usage"
                />
              </label>

              <div className="goal-form-row">
                <label>
                  Target value
                  <input
                    type="number"
                    min="0"
                    value={newGoal.targetValue}
                    onChange={(e) => handleGoalChange("targetValue", e.target.value)}
                    placeholder="e.g. 200"
                  />
                </label>

                <label>
                  Unit
                  <select
                    value={newGoal.unit}
                    onChange={(e) => handleGoalChange("unit", e.target.value)}
                  >
                    <option>kg CO₂</option>
                    <option>kWh</option>
                    <option>Trips</option>
                    <option>Days</option>
                  </select>
                </label>
              </div>

              <div className="goal-form-row">
                <label>
                  Category
                  <select
                    value={newGoal.category}
                    onChange={(e) => handleGoalChange("category", e.target.value)}
                  >
                    <option value="carbon">Carbon footprint</option>
                    <option value="energy">Energy</option>
                    <option value="transport">Transport</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </label>

                <label>
                  Deadline (optional)
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => handleGoalChange("deadline", e.target.value)}
                  />
                </label>
              </div>

              <div className="goal-form-actions">
                <button
                  type="button"
                  className="goal-cancel-btn"
                  onClick={closeGoalModal}
                >
                  Cancel
                </button>
                <button type="submit" className="goal-save-btn">
                  Save goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
