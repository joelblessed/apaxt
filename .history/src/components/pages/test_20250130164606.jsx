import React, { useState, useEffect} from 'react'

const Test = ({api}) => {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
    } else {
      setLoggedInUser(username);
    }
  });

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
              <button >Login</button>
          )}
      </div>
  );
};

export default Test
