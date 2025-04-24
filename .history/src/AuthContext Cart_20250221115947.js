import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { syncCartWithServer } from "./cartSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const signIn = async (userData) => {
    setUser(userData);

    // Fetch user cart from backend
    const response = await fetch(`/cart/${userData.id}`);
    const userCart = await response.json();

    // Merge localStorage cart with server cart
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const mergedCart = [...new Set([...userCart, ...localCart])];

    // Sync with Redux and server
    dispatch(syncCartWithServer(mergedCart));
    localStorage.setItem("cart", JSON.stringify(mergedCart));

    // Save updated cart to backend
    await fetch(`/cart.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userData.id, cart: mergedCart }),
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);