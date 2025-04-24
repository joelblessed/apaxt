// // authService.js

// const AUTH_KEY = 'user'; // Key to store user data in localStorage

// // Simulated login function (replace with actual API request)
// export const login = async (username, password) => {
//   // Simulating an API response (replace with real backend call)
//   if (username === '' && password === '') {
//     const user = { username, token: 'fake-jwt-token' };
//     localStorage.setItem(AUTH_KEY, JSON.stringify(user));
//     return user;
//   } else {
//     throw new Error('Invalid credentials');
//   }
// };

const API_URL = "http://localhost:4500/user/";

// Login function using Fetch API
export const login = async (email, password) => {
  try {
    const response = await fetch('${API_URL}/login;, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

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