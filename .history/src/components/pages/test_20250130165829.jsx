import React, { useState, useEffect} from 'react'

const Test = ({api}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
          setUser(storedUser);
      }
  }, []);

  const handleLogin = () => {
      const userData = {
          username: "JohnDoe",
          profileImage: "https://via.placeholder.com/50",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
  };

 

  return (
      <div>
          {user ? (
              <div>
                  <img
                      src={user.profileImage}
                      alt="Profile"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                  <p>Welcome, {user.username}!</p>
                  <button onClick={handleLogout}>Logout</button>
              </div>
          ) : (
              
          )}
      </div>
  );
};
export default Test
