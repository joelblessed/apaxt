import React, { createContext, useContext, useState } from "react";

// Create Alert Context
const AlertContext = createContext();

// Alert Provider
const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      {alert && (
        <div style={{ padding: "10px", backgroundColor: "red", color: "white" }}>
          {alert}
        </div>
      )}
    </AlertContext.Provider>
  );
};

// Custom Hook to Use Alert
const useAlert = () => useContext(AlertContext);

// App Component
const App = () => {
  const { showAlert } = useAlert();

  return (
    <div>
      <button onClick={() => showAlert("This is a global alert!")}>
        Show Alert
      </button>
    </div>
  );
};

// Main Render
const Main = () => (
  <AlertProvider>
    <App />
  </AlertProvider>
);

export default Main;