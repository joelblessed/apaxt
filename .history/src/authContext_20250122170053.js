import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, login, logout } from './authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data on app start
  useEffect(() => {
    const loggedUser = getCurrentUser();
    if (loggedUser) setUser(loggedUser);
  }, []);

  // Login handler
  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await login(username, password);
      setUser(loggedUser);
    } catch (error) {
      throw error;
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};