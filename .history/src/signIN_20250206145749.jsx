import React, { useState } from "react";

function Login() {
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }), // Send identifier (email or username)
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token); // Store JWT token
      alert("Login successful!");
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
import React from "react";
import Sidebar from "./Sidebar";
import DashboardWidgets from "./DashboardWidgets";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h2>Dashboard</h2>
        <DashboardWidgets />
      </div>
    </div>
  );
}

export default Dashboard;
npm install react-router-dom chart.js react-chartjs-2
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ width: "200px", background: "#333", color: "#fff", height: "100vh", padding: "20px" }}>
      <h3>Dashboard</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>Home</Link></li>
        {user?.role === "admin" && (
          <li><Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>Admin Panel</Link></li>
        )}
        <li><button onClick={logout} style={{ color: "#fff", background: "none", border: "none…
import React from "react";
import { Bar } from "react-chartjs-2";

function DashboardWidgets() {
  const data = {
    labels: ["Users", "Orders", "Revenue"],
    datasets: [
      {
        label: "Stats",
        data: [100, 200, 300],
        backgroundColor: ["blue", "green", "orange"],
      },
    ],
  };

  return (
    <div>
      <h3>Statistics</h3>
      <Bar data={data} />
    </div>
  );
}

export default DashboardWidgets;