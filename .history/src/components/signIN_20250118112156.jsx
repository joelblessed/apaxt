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