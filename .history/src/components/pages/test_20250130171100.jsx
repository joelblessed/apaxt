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
    if (userData === "" || userData === null) {
    } else {
      setUser(userData);
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
                    <button>Logout</button>
                </div>
            ) : (
                <button >Login</button>
            )}
        </div>
    );
};
export default Test
