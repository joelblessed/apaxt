import React from 'react'
import { useNavigate } from "react-router-dom";
import SignUP from './signUP';
import SignIN from './signIN';
const LogIN = () => {

  const navigate = useNavigate();

  const handlesignin = () => {
    navigate("/signUP"); // Navigate to dashboard after login
  }

  

  const handles = () => {
    navigate("/signUP"); // Navigate to dashboard after login
  };
  return (
    <div>
         <button onClick={handlesignin}>Sign In</button>
         <button onClick={handlesignup}>Sign UP</button>
     
    </div>
  )
}

export default LogIN
