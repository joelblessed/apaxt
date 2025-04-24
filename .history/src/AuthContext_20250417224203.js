import { createContext,useState, useEffect } from "react";
import {api} from "./config";
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("username"))
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage"))
  


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username")
    const userId = localStorage.getItem("userId")
    const profileImage = localStorage.getItem("profileImage")
    if (token && role) {
      setUser({token, role, userId, username, profileImage});
    }
  }, []);

  const login = (token, role, data,) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("userData", JSON.stringify(data));
    setUser({ data, token, role, username });

    // fetch(`${api}/logs`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     userId: user.userId,
    //     action: 'logIn'
    //   })
    // });
  };
  // useEffect(() => {
    if (!user?.userId) return; // only run if userId exists
  
    fetch(`${api}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.userId,
        action: 'logyIn'
      })
    })
      .then(res => res.json())
      .then(data => console.log('Log created:', data))
      .catch(err => console.error('Error logging in:', err));
  }, [user?.userId]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileImage");
    // localStorage.removeItem("cart");
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    setUser(null);
    setUsername(null)


    fetch(`${api}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.userId,
        action: 'logkut'
      })
    });
  };


  return (
    <AuthContext.Provider value={{ user,username,profileImage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
