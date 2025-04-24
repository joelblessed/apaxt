import React from 'react'
import { useNavigate } from "react-router-dom";
import SignUP from './signUP';
import SignIN from './signIN';
const LogIN = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/si"); // Navigate to dashboard after login
  };

  return (
    <div>
     
    </div>
  )
}

export default LogIN
