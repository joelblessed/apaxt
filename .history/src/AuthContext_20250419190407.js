import { createContext, useState, useEffect } from "react";
import { api } from "./config";
import SignIn from "./components/account/signIN";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const profileImage = localStorage.getItem("profileImage");
    const email = localStorage.getItem("email");
    const wallet = localStorage.getItem("wallet");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const address = localStorage.getItem("address");
    const country = localStorage.getItem("country");
    const fullName = localStorage.getItem("fullName");
    const referralCode = localStorage.getItem("referralCode");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const gender = localStorage.getItem("gender");
    if (token && role) {
      setUser({ token,
        role,
        profileImage,
        gender,
        email,
        wallet,
        phoneNumber,
        address,
        country,
        fullName,
        userName,
        referralCode ,
        userId,
      });
    }
  }, []);

  const login = (
    token,
    role,
    profileImage,
    gender,
    email,
    wallet,
    phoneNumber,
    address,
    country,
    fullName,
    userName,
    referralCode
    id,
    city,
    dateOfBirth
    // cart,
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("profileImage", profileImage);
    localStorage.setItem("gender", gender);
    localStorage.setItem("email", email);
    localStorage.setItem("wallet", wallet);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("address", address);
    localStorage.setItem("country", country);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("userName", userName);
    localStorage.setItem("referralCode", referralCode);

    // localStorage.setItem("cart", JSON.stringify([]));
    setUser({
      token,
      role,
      profileImage,
      gender,
      email,
      wallet,
      phoneNumber,
      address,
      country,
      fullName,
      userName,
      referralCode,

  
    });

    fetch(`${api}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.user.id,
        action: "login",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Log created:", data))
      .catch((error) => console.error("Error:", error));
  };

  // useEffect (()=>{
  //   fetch(`${api}/logs`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       userId: userId,
  //       action: 'login'
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log('Log created:', data))
  //   .catch(error => console.error('Error:', error));
  // },[login])

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("gender");
    localStorage.removeItem("email");
    localStorage.removeItem("wallet");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("address");
    localStorage.removeItem("country");
    localStorage.removeItem("fullName");
    localStorage.removeItem("referralCode");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    localStorage.removeItem("userName");



    setUser(null);
   

    fetch(`${api}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.user.id,
        action: "logout",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Log created:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
