import React from "react";
import { useNavigate } from "react-router-dom";

function SignIN({ onSignIn }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate a login process
    onSignIn(); // Update authentication state
    navigate("/dashboard"); // Navigate to dashboard after login
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}

export default SignIN


http://localhost:4500/accounts


import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Replace with your API endpoint
      const response = await fetch("http://localhost:4500/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Save token to localStorage or context
      localStorage.setItem("token", data.token);

      // Redirect or update UI on successful login
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login
