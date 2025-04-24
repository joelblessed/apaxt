import React from 'react'
import { useNavigate } from "react-router-dom";
import SignUP from './signUP';
import SignIN from './signIN';
const LogIN = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate a login process
     // Update authentication state
    navigate("/newProduct"); // Navigate to dashboard after login
  };
  return (
    <div>
      <SignIN/>
      <S
    </div>
  )
}

export default LogIN
