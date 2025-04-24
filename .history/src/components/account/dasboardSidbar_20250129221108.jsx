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
        <li><button onClick={logout} style={{ color: "#fff", background: "none", border: "none", cursor: "pointer" }}>Logout</button></li>
      </ul>
    </div>
  );
}

export default Sidebar