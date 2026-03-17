import { useEffect, useState } from "react";
import "../App.css";
import "./carbon-form.css";

export default function CarbonCalculator() {
  const [vehicleCount, setVehicleCount] = useState(1);
  const [formState, setFormState] = useState({
    electricity: "",
    cleanEnergy: "",
    water: "",
    waste: "",
    recycleEnabled: false,
    recyclePercent: "",
    vehicles: [
      {
        id: 1,
        vehicle_type: "Two-wheeler",
        fuel: "petrol",
        distance_km: "",
        passengers: "0",
      },
    ],
  });

  const [result, setResult] = useState(null);
  const [ecoScore, setEcoScore] = useState(0);
  const [daily, setDaily] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [predictionVisible, setPredictionVisible] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setPredictionVisible(false);
  }, []);

  const parseCleanEnergy = (value) => {
    if (!value || value === "Don't know") return 0;
    const upper = value.split("–")[1];
    return Number(upper.replace("%", ""));
  };

  const handleFieldChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleVehicleChange = (index, field, value) => {
    setFormState((prev) => {
      const vehicles = [...prev.vehicles];
      vehicles[index] = { ...vehicles[index], [field]: value };
      return { ...prev, vehicles };
    });
  };

  const addVehicle = () => {
    setFormState((prev) => ({
      ...prev,
      vehicles: [
        ...prev.vehicles,
        {
          id: vehicleCount + 1,
          vehicle_type: "Two-wheeler",
          fuel: "petrol",
          distance_km: "",
          passengers: "0",
        },
      ],
    }));
    setVehicleCount((c) => c + 1);
  };

  const toggleRecycle = (enabled) => {
    setFormState((prev) => ({ ...prev, recycleEnabled: enabled }));
  };

  const animateNumber = (setter, value) => {
    let start = 0;
    const duration = 800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setter(value);
        clearInterval(counter);
      } else {
        setter(Number(start.toFixed(2)));
      }
    }, stepTime);
  };

  const updateEcoRing = (score) => {
    const circle = document.querySelector(".eco-ring .progress");
    if (!circle) return;
    const circumference = 440;
    circle.style.strokeDashoffset = circumference;
    circle.getBoundingClientRect();
    circle.style.strokeDashoffset =
      circumference - (score / 100) * circumference;

    if (score >= 70) circle.style.stroke = "#16a34a";
    else if (score >= 40) circle.style.stroke = "#eab308";
    else circle.style.stroke = "#dc2626";
  };

  const setEcoLabel = (score) => {
    if (score >= 80) return "🌱 Excellent sustainability level";
    if (score >= 60) return "✅ Good, above average";
    if (score >= 40) return "⚠️ Moderate impact";
    return "🚨 High carbon footprint";
  };

  const setEcoPercentile = (score) => {
    const percentile = Math.min(95, Math.max(5, Math.round(score)));
    return `You are doing better than ${percentile}% of users`;
  };

  const setEcoTip = () => {
    return "Reduce 200 kg CO₂ → +6.7 EcoScore";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictionVisible(false);

    const recycledPercent =
      formState.recycleEnabled && formState.recyclePercent
        ? Number(formState.recyclePercent || 0)
        : 0;

    const payload = {
      electricity_kwh: Number(formState.electricity || 0),
      clean_energy_percent: parseCleanEnergy(formState.cleanEnergy),
      water_liters: Number(formState.water || 0),
      waste_kg: Number(formState.waste || 0),
      recycled_percent: recycledPercent,
      vehicles: formState.vehicles.map((v) => ({
        vehicle_type: v.vehicle_type,
        fuel: v.fuel,
        distance_km: Number(v.distance_km || 0),
        passengers: Math.max(Number(v.passengers || 0), 0),
      })),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/calculate-carbon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResult({
        daily: data.daily,
        monthly: data.monthly,
        eco_score: data.eco_score,
      });
      animateNumber(setDaily, data.daily);
      animateNumber(setMonthly, data.monthly);
      animateNumber(setEcoScore, data.eco_score);
      updateEcoRing(data.eco_score);
    } catch (err) {
      alert("Server error. Is backend running?");
    }
  };

  const handlePredictClick = (e) => {
    e.preventDefault();
    setPredictionVisible(false);
    setShowAuthModal(true);
  };

  const closeModal = () => setShowAuthModal(false);

  return (
    <div className="calculator-page">
      <div className="container">
        <h1>🌱 Carbon Footprint Calculator</h1>
        <p className="subtitle">Estimate your daily environmental impact</p>

        <form onSubmit={handleSubmit}>
          <section>
            <h2>⚡ Electricity Usage</h2>
            <label>
              Average daily electricity usage (kWh)
              <input
                type="number"
                min="0"
                value={formState.electricity}
                onChange={(e) => handleFieldChange("electricity", e.target.value)}
                required
              />
            </label>

            <label>
              Clean energy contribution
              <select
                value={formState.cleanEnergy}
                onChange={(e) => handleFieldChange("cleanEnergy", e.target.value)}
              >
                <option value="">Select range</option>
                <option>0–20%</option>
                <option>21–40%</option>
                <option>41–60%</option>
                <option>61–80%</option>
                <option>81–100%</option>
                <option>Don't know</option>
              </select>
            </label>
          </section>

          <section>
            <h2>🚗 Transportation</h2>
            <div id="vehicleList">
              {formState.vehicles.map((v, index) => (
                <div className="vehicle" key={v.id}>
                  <h4>Vehicle {index + 1}</h4>

                  <label>
                    Vehicle type
                    <select
                      className="vehicle-type"
                      value={v.vehicle_type}
                      onChange={(e) =>
                        handleVehicleChange(index, "vehicle_type", e.target.value)
                      }
                    >
                      <option>Two-wheeler</option>
                      <option>Car</option>
                      <option>Bus</option>
                    </select>
                  </label>

                  <label>
                    Fuel type
                    <select
                      className="fuel-type"
                      value={v.fuel}
                      onChange={(e) =>
                        handleVehicleChange(index, "fuel", e.target.value)
                      }
                    >
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="cng">CNG</option>
                      <option value="electric">Electric</option>
                    </select>
                  </label>

                  <label>
                    Distance traveled per day (km)
                    <input
                      type="number"
                      className="distance"
                      min="0"
                      value={v.distance_km}
                      onChange={(e) =>
                        handleVehicleChange(index, "distance_km", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    Number of co-passengers
                    <input
                      type="number"
                      className="passengers"
                      min="0"
                      value={v.passengers}
                      onChange={(e) =>
                        handleVehicleChange(index, "passengers", e.target.value)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="add-btn"
              onClick={addVehicle}
            >
              + Add another vehicle
            </button>
          </section>

          <section>
            <h2>💧 Water Usage</h2>
            <label>
              Average water used per day (liters)
              <input
                type="number"
                min="0"
                value={formState.water}
                onChange={(e) => handleFieldChange("water", e.target.value)}
              />
            </label>
          </section>

          <section>
            <h2>♻️ Waste & Recycling</h2>

            <label>
              Waste generated per day (kg)
              <input
                type="number"
                min="0"
                value={formState.waste}
                onChange={(e) => handleFieldChange("waste", e.target.value)}
              />
            </label>

            <div className="radio-group">
              <span>Do you recycle?</span>
              <label>
                <input
                  type="radio"
                  name="recycle"
                  checked={formState.recycleEnabled}
                  onChange={() => toggleRecycle(true)}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="recycle"
                  checked={!formState.recycleEnabled}
                  onChange={() => toggleRecycle(false)}
                />{" "}
                No
              </label>
            </div>

            {formState.recycleEnabled && (
              <div id="recycleWrapper">
                <label>
                  Percentage of waste recycled (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formState.recyclePercent}
                    onChange={(e) =>
                      handleFieldChange("recyclePercent", e.target.value)
                    }
                  />
                </label>
              </div>
            )}
          </section>

          <button type="submit">Calculate Carbon Footprint</button>
        </form>

        {result && (
          <div id="result" className="result-box">
            <h2>Your Carbon Footprint</h2>

            <div className="eco-ring">
              <svg width="160" height="160">
                <circle className="bg" cx="80" cy="80" r="70"></circle>
                <circle className="progress" cx="80" cy="80" r="70"></circle>
              </svg>

              <div className="eco-score-text">
                <span id="eco">{ecoScore.toFixed(0)}</span>
                <small>/100</small>
              </div>
            </div>

            <p id="eco-label">{setEcoLabel(result.eco_score)}</p>
            <p id="eco-percentile">{setEcoPercentile(result.eco_score)}</p>
            <p id="eco-tip">{setEcoTip()}</p>

            <hr />

            <p>
              <strong>Daily CO₂:</strong>{" "}
              <span id="daily">{daily.toFixed(2)} kg</span>
            </p>
            <p>
              <strong>Monthly CO₂:</strong>{" "}
              <span id="monthly">{monthly.toFixed(2)} kg</span>
            </p>

            <button
              type="button"
              id="predictBtn"
              className="predict-btn"
              onClick={handlePredictClick}
            >
              🔮 Predict Next Month
            </button>

            {predictionVisible && (
              <div id="predictionBox" className="prediction-box">
                <p>
                  <strong>Predicted Monthly CO₂:</strong>{" "}
                  <span id="predictedValue">—</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showAuthModal && (
        <div id="authModal" className="modal">
          <div className="modal-content">
            <h3>🔒 Prediction Locked</h3>
            <p>
              Monthly prediction is available for <strong>registered users only</strong>.
              Create an account to unlock insights and track your progress.
            </p>

            <div className="modal-actions">
              <button
                className="modal-btn primary"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
              <button
                className="modal-btn secondary"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </button>
              <button className="modal-btn ghost" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

