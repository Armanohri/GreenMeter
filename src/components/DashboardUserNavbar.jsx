import "./dashboardusernavbar.css";

export default function DashboardUserNavbar({ theme, toggleTheme }) {
  return (
    <nav className="uh-nav">
      <div className="uh-nav-inner">

        {/* LEFT SIDE */}
        <div className="uh-nav-left">
          <span className="uh-nav-logo">🌱</span>
          <h2>GreenMeter</h2>
        </div>

        {/* RIGHT SIDE */}
        <div className="uh-nav-right">
          <button className="uh-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            className="uh-logout-nav"
            onClick={() => {
              localStorage.removeItem("loggedIn");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}
