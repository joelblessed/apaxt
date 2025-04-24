import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";


const Wallet = ({ api}) => {

    const { user } = useContext(AuthContext);
  
  const referralCode = User.referralCode;
  const referralLink = `https://apaxt.netlify.app/signUp?ref=${referralCode}`;
console.log( User)
  return (
    <>
      <h3>Your Referral Code: {referralCode}</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <a href={referralLink} target="_blank" rel="noopener noreferrer">
            {referralLink}
          </a>
        </div>
        <div>
          <button onClick={() => navigator.clipboard.writeText(referralLink)}>
            Copy Referral Link
          </button>
        </div>
      </div>

      <div>
        <h3>Wallet Balance: {User.wallet}</h3>
      </div>
    </>
  );
};

export default Wallet;