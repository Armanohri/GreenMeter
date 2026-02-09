export default function Features() {
  const handleFeatureClick = () => {
    if (!localStorage.getItem("loggedIn")) {
      window.location.href = "/login";
      return;
    }

    // If logged in → future navigation
    alert("Feature unlocked! (You can link to dashboard features here)");
  };

  return (
    <div className="features">

      <h2>Your Personal Sustainability Dashboard</h2>

      <div className="feature-grid">

        <div className="feature-box" onClick={handleFeatureClick}>
          <div className="feature-icon">🌍</div>
          <div className="feature-title">Track Your Carbon Footprint</div>
          <div className="feature-text">Get real-time insights.</div>
        </div>

        <div className="feature-box" onClick={handleFeatureClick}>
          <div className="feature-icon">🤖</div>
          <div className="feature-title">AI Insights</div>
          <div className="feature-text">Smart recommendations.</div>
        </div>

        <div className="feature-box" onClick={handleFeatureClick}>
          <div className="feature-icon">🎯</div>
          <div className="feature-title">Set Goals</div>
          <div className="feature-text">Achieve your targets.</div>
        </div>

        <div className="feature-box" onClick={handleFeatureClick}>
          <div className="feature-icon">📊</div>
          <div className="feature-title">See Progress</div>
          <div className="feature-text">Track improvements.</div>
        </div>

      </div>
    </div>
  );
}
