import { useDispatch } from "react-redux";
import { loadCartAfterLogin } from "../redux/actions/cartActions";

const handleLogin = async (userCredentials) => {
    try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();

        // Find the user in db.json
        const user = users.find(u => u.email === userCredentials.email && u.password === userCredentials.password);
        
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));

            // Load and merge cart
            dispatch(loadCartAfterLogin(user.id));
        } else {
            console.error("User not found");
        }
    } catch (error) {
        console.error("Login failed", error);
    }
};