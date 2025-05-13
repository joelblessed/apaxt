import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";

const Wallet = ({ api }) => {
  const { user } = useContext(AuthContext);
  const [User, setUser] = useState(user || {});
  const referralCode = User.referral_code;

  // Initialize referralLink variable
  let referralLink = "";

  if (api === "https://apaxt-api.onrender.com") {
    referralLink = `https://apaxt2.netlify.app/signUp?ref=${referralCode}`;
  } else {
    referralLink = `http://localhost:3000/signUp?ref=${referralCode}`;
  }

  // Inline styles
  const containerStyle = {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const linkStyle = {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const balanceStyle = {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h3>Your Referral Code: {referralCode}</h3>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <div>
          <a
            href={referralLink}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {referralLink}
          </a>
        </div>
        <div>
          <button
            style={buttonStyle}
            onClick={() => navigator.clipboard.writeText(referralLink)}
          >
            Copy Referral Link
          </button>
        </div>
      </div>

      <div style={balanceStyle}>
        <h3>Wallet Balance: {User.wallet}</h3>
      </div>
    </div>
  );
};

export default Wallet;
