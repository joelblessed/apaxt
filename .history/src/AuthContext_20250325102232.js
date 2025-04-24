import { createContext,useState, useEffect } from "react";
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
    loca localStorage.setItem("role", role);
    lStorage.setItem("role", role);
    
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("userData", JSON.stringify(data));
    setUser({ data, token, role, username });
  };

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
  };


  return (
    <AuthContext.Provider value={{ user,username,profileImage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
