import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signIN.css"
import {toast} from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";

const SignIN = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] =useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (validation()){
  
 
     
     fetch("http://localhost:4500/accounts/"+ email)
     .then(response => response.json())
     .then(data => {
         setEmail(data);
         if(Object.keys(resp).length === 0){
          toast.error("please enter a valid usreName")
         }
         else{
          if (resp.password === password){
            toast.sucess("signIN successful");
            navigate("/dashboard")
          }
          else{
            toast.error("please enter a valid password")
          }
      })
      
      .then ((resp)=>{
       console.log(resp)
       if(Object.keys(resp).length === 0){
        toast.error("please enter a valid usreName")
       }
       else{
        if (resp.password === password){
          toast.sucess("signIN successful");
          navigate("/dashboard")
        }
        else{
          toast.error("please enter a valid password")
        }
      }
}) 
.catch((err)=>{
  toast.error("login failed due to :"+err.message);
})
}}

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
            onChange={(e) => setEmail (e.target.value)}
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
       
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIN