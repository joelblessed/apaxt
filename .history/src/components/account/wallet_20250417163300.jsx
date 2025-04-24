const Wallet = ({ user }) => {
  const referralCode = user.referralCode;
  const referralLink = `https://apaxt.netlify.app/signUp?ref=${referralCode}`;

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
        <h3>Wallet Balance: {user.discount}</h3>
      </div>
    </>
  );
};