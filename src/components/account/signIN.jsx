import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mergeCartsAfterLogin} from "../../cartJs/cartThunks";
import { fetchWishlist, addToWishlist } from "../../wishlistSlice";
import "./signIN.css"; // Import the CSS file

function SignIn({ api, handleLogin, add }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theUser, setTheuser] = useState(localStorage.getItem("userId"))
  const localCart = JSON.parse(localStorage.getItem('cart')) || [];
  
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${api}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.id !== theUser) {
        localStorage.removeItem("cart");
      }

      login(
        data.token,
        data.user.role,
        data.user.profile_image,
        data.user.gender,
        data.user.email,
        data.user.wallet,
        data.user.phone_number,
        data.user.address,
        data.user.country,
        data.user.first_name,
        data.user.last_name,
        data.user.username,
        data.user.referral_code,
        data.user.id,
        data.user.city,
        data.user.date_of_birth
      );

      localStorage.setItem("userId", data.user.id);
      merge(data.token)
      handleWishlistmerge(data.user.id);
      navigate("/dashboard");
      dispatch(mergeCartsAfterLogin());
      console.log("token", data.token);
    } catch (err) {
      console.error("Sign-in error:", err.message); // Log sign-in error
      setError(err.message || "Login failed");
    }
  };

  const userId = localStorage.getItem("userId");

  const handleWishlistmerge = async (userId) => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;
   await fetch(`${api}/wishlist/migrate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, user_id: userId })
    });
    
  
    localStorage.removeItem('sessionId');
  };


 const merge = async ( token) => {
   const response = await fetch(`${api}/cart/merge`, {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     },
  
     body: JSON.stringify({ localCart:localCart })
   });   
   if (!response.ok) throw new Error('Failed to merge carts');
   
   return await response.json();
 };
 

 const localC =()=>{
  console.log("carzgdt",localCart)
 }

  
  return (
    <div className="signin-container">
      <h2>Login</h2>
      <form onSubmit={handleSignIn} className="signin-form">
        <div>
          <input
            type="text"
            placeholder="Enter Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-button"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <p>
          Create account? <Link to="/signUP">Sign Up</Link>
        </p>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {/* <button onClick={() =>    dispatch(mergeCartsAfterLogin())}>ted</button> */}
    </div>
  );
}

export default SignIn;
