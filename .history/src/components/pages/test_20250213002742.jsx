import React, { useState } from "react";

function Test() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>

        <div>
         
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Test;