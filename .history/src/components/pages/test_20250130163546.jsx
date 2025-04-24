import React, { useState, useEffect} from 'react'

const Test = ({api}) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = () => {
      // Simulated login (replace with API call)
    useEffect (){
      
    }

  return (
      <div>
          {loggedInUser ? (
              <div>
                  <img
                      src={loggedInUser.profileImage}
                      alt="Profile"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                  <p>Welcome, {loggedInUser.username}!</p>
              </div>
          ) : (
              <button onClick={handleLogin}>Login</button>
          )}
      </div>
  );
};

export default Test
