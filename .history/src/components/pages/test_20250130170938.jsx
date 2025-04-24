import React, { useState, useEffect} from 'react'

const Test = ({api}) => {
   const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

   useEffect(() => {
    let userData = sessionStorage.getItem("username");
    if (username === "" || username === null) {
    } else {
      displayusernameupdate(user);
    }
  });

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
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};
export default Test
