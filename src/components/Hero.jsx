export default function Hero() {
  return (
    <section className="hero">

      {/* FLOATING LEAVES */}
      <div className="leaf-container">
        <div className="leaf"></div>
        <div className="leaf"></div>
        <div className="leaf"></div>
        <div className="leaf"></div>
        <div className="leaf"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="hero-inner">

        {/* LEFT SIDE CONTENT */}
        <div className="hero-left">
          <h1>Reduce Your Carbon Footprint</h1>

          <p>
            Track and minimize your environmental impact with our AI-powered
            sustainability dashboard.
          </p>

          <div className="hero-buttons">
            <button className="btn1">Get Started</button>
            <button className="btn2">Watch Demo</button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero-right">
          <img
            src="/src/assets/Desktop.png"
            alt="Dashboard illustration"
            className="hero-img"
          />
        </div>

      </div>

    </section>
  );
}
