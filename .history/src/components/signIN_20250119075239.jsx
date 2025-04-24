import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signIN.css"
import {toast} from "react-toastify";

const SignIN = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] =useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call your backend API (replace with your actual API URL)
      const response = await fetch("http://localhost:4500/accounts"+email || +userName)
      .then((res)=>{
        return res

      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
      }

      const data = await response.json();
      console.log("Login successful", data);

      // Save the token in localStorage or context
      localStorage.setItem("token", data.token);

      // Navigate to a protected route after login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const validation =()=>{
    let result=true;
    if (email || userName ==="" || email ||userName === null){
      result =false;
      toast.warning("please enter userName")
    }
    if (password ==="" || password === null){
      result =false;
      toast.warning("please enter password")
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIN