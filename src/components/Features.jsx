export default function Features() {
  const features = [
    {
      icon: "🌍",
      title: "Track Your Carbon Footprint",
      desc: "Get real-time insights into your daily carbon emissions.",
    },
    {
      icon: "🤖",
      title: "AI-Powered Insights",
      desc: "Receive personalized tips to reduce your carbon footprint.",
    },
    {
      icon: "🎯",
      title: "Set Goals & Challenges",
      desc: "Set sustainability goals and monitor your progress.",
    },
    {
      icon: "📊",
      title: "See Your Progress",
      desc: "Track your eco-efficiency improvements.",
    },
  ];

  return (
    <section className="features">
      <h2>Your Personal Sustainability Dashboard</h2>

      <div className="feature-grid">
        {features.map((f, i) => (
          <div className="feature-box" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-text">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
