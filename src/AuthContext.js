import { createContext, useState, useEffect } from "react";
import { api } from "./config";
import SignIn from "./components/account/signIN";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const profile_image = localStorage.getItem("profileImage");
    const email = localStorage.getItem("email");
    const wallet = localStorage.getItem("wallet");
    const phone_number = localStorage.getItem("phoneNumber");
    const address = localStorage.getItem("address");
    const country = localStorage.getItem("country");
    const first_name = localStorage.getItem("firstName");
    const last_name = localStorage.getItem("lastName");
    const date_of_birth = localStorage.getItem("dateOfBirth");
    const referral_code = localStorage.getItem("referralCode");
    const username = localStorage.getItem("userName");
    const id = localStorage.getItem("userId");
    const gender = localStorage.getItem("gender");
    const city = localStorage.getItem("city"); 
    if (token && role) {
      setUser({
        token,
        role,
        profile_image,
        gender,
        email,
        wallet,
        phone_number,
        address,
        country,
        first_name,
        last_name,
        username,
        referral_code,
        id,
        city,
        date_of_birth,
      });
    }
  }, []);

  const login = (
    token,
    role,
    profile_image,
    gender,
    email,
    wallet,
    phone_number,
    address,
    country,
    first_name,
    last_name,
    username,
    referral_code,
    id,
    city,
    date_of_birth
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("profileImage", profile_image);
    localStorage.setItem("gender", gender);
    localStorage.setItem("email", email);
    localStorage.setItem("wallet", wallet);
    localStorage.setItem("phoneNumber", phone_number);
    localStorage.setItem("address", address);
    localStorage.setItem("country", country);
    localStorage.setItem("firstName", first_name );
    localStorage.setItem("lastName", last_name );
    localStorage.setItem("userName", username);
    localStorage.setItem("referralCode", referral_code);
    localStorage.setItem("userId", id);
    localStorage.setItem("city", city);
    localStorage.setItem("dateOfBirth", date_of_birth);
  


    setUser({
      token,
      role,
      profile_image,
      gender,
      email,
      wallet,
      phone_number,
      address,
      country,
      first_name,
      last_name,
      username,
      referral_code,
      id,
      city,
      date_of_birth,
      
    });

    fetch(`${api}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: id,
        action: "login",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Log created:", data))
      .catch((error) => console.error("Error:", error));
  };

 
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
    localStorage.removeItem("city");
    localStorage.removeItem("dateOfBirth"); // Ensure these are removed during logout
    localStorage.removeItem("OrdersCount");


    

    setUser(null);

    fetch(`${api}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        userId: user?.id, // Fix: Correct reference to userId
        action: "logout",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Log created:", data))
      .catch((error) => console.error("Error:", error));
  };

localStorage.setItem("user", JSON.stringify(user));

// Auto signout after 24 hours
useEffect(() => {
  if (user?.token) {
    const timeout = setTimeout(() => {
      logout();
    }, 24 * 60 * 60 * 1000); // 24 hours in ms

    return () => clearTimeout(timeout); // Cleanup on unmount or token change
  }
}, [user?.token]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
