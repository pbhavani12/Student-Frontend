import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../AuthContext";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage visibility of password
  const [error, setError] = useState("");
  const { isAuthenticated, login } = useAuth();

  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      // Validation for username (no numbers allowed)
      if (/\d/.test(username)) {
        setError("Username cannot contain numbers");
        return; // Exit the function if username contains numbers
      }

      // Validation for password (at least one special character, uppercase, lowercase, and number)
      const passwordRegex =
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        setError(
          "Password must contain at least one special character, uppercase letter, lowercase letter, and number"
        );
        return; // Exit the function if password does not meet requirements
      }

      const response = await fetch("https://backend-4vwz.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate("/Home2");
        login();
      } else {
        setError("Login failed"); // Handle login failure
      }
    } catch (error) {
      setError("Error: " + error.message); // Handle network errors
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <i
          className={`fa ${
            showPassword ? "fa-eye-slash" : "fa-eye"
          } password-toggle`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>
      <button onClick={handleLoginClick} className="login-button">
        Login
      </button>
      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
