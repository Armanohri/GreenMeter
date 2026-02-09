export default function HowItWorks() {
  const steps = [
    {
      icon: "🔌",
      title: "Connect Your Devices",
      desc: "Sync your energy and mobility data easily.",
    },
    {
      icon: "🧠",
      title: "Get AI Insights",
      desc: "Receive personalized recommendations.",
    },
    {
      icon: "📉",
      title: "Track & Improve",
      desc: "Monitor your eco-score and improve your habits.",
    },
  ];

  return (
    <section className="how">
      <h2>How It Works</h2>

      <div className="how-grid">
        {steps.map((s, i) => (
          <div className="how-box" key={i}>
            <div className="how-icon">{s.icon}</div>
            <h3 className="how-title">{s.title}</h3>
            <p className="how-text">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
