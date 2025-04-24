import React from 'react'
import { useNavigate } from "react-router-dom";
import SignUP from './signUP';
import SignIN from './signIN';
const LogIN = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/signUP"); // Navigate to dashboard after login
  };

  return (
    <div>
         <button onClick={handlesign}>Sign In</button>
         <button onClick={handleLogin}>Sign UP</button>
     
    </div>
  )
}

export default LogIN
