import { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();   // ✅ React Router redirect

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    // save login state
    localStorage.setItem("loggedIn", "true");

    // navigate without refreshing
    navigate("/dashboard");  // ✅ FIX
  };

  return (
    <div className="auth-container">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="auth-card">
        <h2 className="auth-title">LOGIN</h2>

        <input
          type="email"
          className="auth-input"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          SIGN IN
        </button>

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
