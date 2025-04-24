import { useState } from "react";

const Test = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: "relative", width: "fit-content" }}>
      <input
         onChange={(e) => setIdentifier(e.target.value)}
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        style={{ paddingRight: "30px" }} // Space for the icon
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {showPassword ? "👁️" : "🙈"}
      </button>
    </div>
  );
};

export default Test;