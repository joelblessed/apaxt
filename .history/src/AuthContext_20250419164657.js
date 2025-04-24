import { createContext, useState, useEffect } from "react";
import { api } from "./config";
import SignIn from "./components/account/signIN";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage")
  );
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const profileImage = localStorage.getItem("profileImage");
    const gender = localStorage.getItem("gender");
    if (token && role) {
      setUser({ token, role, userId, gender, username, profileImage });
    }
  }, []);

  const login = (token, role, userName, profileImage, gender) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("gender", gender);
    localStorage.setItem("username", userName);
    localStorage.setItem("profileImage", profileImage);
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
      username,
      referralc
    });

    fetch(`${api}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
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
    localStorage.removeItem("userId");
    localStorage.removeItem("profileImage");
    // localStorage.removeItem("cart");
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    setUser([]);
    setUsername("");

    fetch(`${api}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        action: "logout",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Log created:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <AuthContext.Provider
      value={{ user, username, profileImage, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
