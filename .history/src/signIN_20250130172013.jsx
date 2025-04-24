import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {AuthContext } from "./AuthContext"

function SignIN({api}) {
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 const {login} = useContext(AuthContext)
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${api}/signin`, {
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
      login(data.token, data.role)
      toast.success('Success');
      sessionStorage.setItem('username',identifier);
      sessionStorage.setItem('userrole',response.role);
      onSignIn()
      navigate('/newProduct')


      
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }


    try {
      const response = await fetch(`${api}/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "JohnDoe" }),
      });
      const data = await response.json();

      if (data.success) {
          const userData = {
              username: data.username,
              profileImage: data.profileImage, // API should return profile image URL
          };

          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
      } else {
          alert("Login failed");
      }
  } catch (error) {
      console.error("Error logging in:", error);
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

export default SignIN;