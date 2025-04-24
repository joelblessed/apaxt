import React, { createContext, useState, useEffect } from 'react';

// Create authentication context
export const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to store user data
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user session
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user session
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// authService.js

const AUTH_KEY = 'user'; // Key to store user data in localStorage

// Simulated login function (replace with actual API request)
export const login = async (username, password) => {
  // Simulating an API response (replace with real backend call)
  if (username === 'admin' && password === 'password') {
    const user = { username, token: 'fake-jwt-token' };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  } else {
    throw new Error('Invalid credentials');
  }
};

// Logout function to remove user from local storage
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Function to get the current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  return !!getCurrentUser(); // Returns true if user exists, false otherwise
};