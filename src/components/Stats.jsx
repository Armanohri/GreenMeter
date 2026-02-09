import { useEffect, useRef } from "react";

export default function Stats() {
  const statsRef = useRef(null);

  useEffect(() => {
    const counters = statsRef.current.querySelectorAll(".count");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            let target = +counter.getAttribute("data-target");
            let speed = 40;

            let updateCount = () => {
              let current = +counter.innerText;

              if (current < target) {
                counter.innerText = Math.ceil(current + target / speed);
                requestAnimationFrame(updateCount);
              } else {
                counter.innerText = target;
              }
            };

            updateCount();
          });

          observer.disconnect();
        }
      });
    });

    observer.observe(statsRef.current);
  }, []);

  return (
    <section className="stats fade-up" ref={statsRef}>
      
      <div className="stat-box">
        <h2 className="stat-title count" data-target="82">0</h2>
        <p className="stat-text">Avg. Behavior Score</p>
      </div>

      <div className="stat-box">
        <h2 className="stat-title count" data-target="67">0</h2>
        <p className="stat-text">Eco Efficiency Index</p>
      </div>

      <div className="stat-box">
        <h2 className="stat-title count" data-target="9">0</h2>
        <p className="stat-text">Rank (Lowest CO₂ Users)</p>
      </div>

    </section>
  );
}
