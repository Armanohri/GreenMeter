import "./Auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation #1 – empty fields
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    // Validation #2 – email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validation #3 – password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // No error – UI only
    setError("");
    alert("Frontend Login Successful (No backend connected)");
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to continue</p>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          className="auth-input"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" type="submit">
          Log In
        </button>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
