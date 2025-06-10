import React from 'react';
import { useNavigate } from 'react-router-dom';
import './unauthorized.css'; // Assuming you have a CSS file for styling

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1 className="unauthorized-title">403 - Access Denied</h1>
        <div className="unauthorized-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <p className="unauthorized-message">
          You don't have permission to access this page.
        </p>
        <div className="unauthorized-actions">
          <button onClick={goBack} className="back-button">
            Go Back
          </button>
          <button onClick={goHome} className="home-button">
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;