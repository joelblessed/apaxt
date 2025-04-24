import { createContext,useState, useEffect } from "react";
import {api} from "./config";
import SignIn from "./components/account/signIN";
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage"));
  const userId = localStorage.getItem("userId");
  const [currentUser, setCurrentUser] = useState(null);
 

  


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId")
    const profileImage = localStorage.getItem("profileImage");
    if (token && role) {
      setUser({token, role, username, profileImage});
    }
  }, []);

  const login = (token, role, userName,profileImage, user ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", user);
    localStorage.setItem("username", userName);
    localStorage.setItem("profileImage",profileImage);
    // localStorage.setItem("cart", JSON.stringify([]));
    setUser({ token, role, username, user });

  fetch(`${api}/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: user.id,
      action: 'login'
    })
  })
  .then(response => response.json())
  .then(data => console.log('Log created:', data))
  .catch(error => console.error('Error:', error));


  
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
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    setUser(null);
    setUsername(null)


    fetch(`${api}/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        action: 'logout'
      })
    })
    .then(response => response.json())
    .then(data => console.log('Log created:', data))
    .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    // Load user from localStorage or API
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const updateUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  return (
    <AuthContext.Provider value={{ user,username,profileImage, currentUser, updateUser , login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



