import React, { useState } from 'react';

const Test = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!token) {
      setError('Token is required');
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      // Fetch user data using the token
      const response = await fetch('http://localhost:5000/profile', {
        method: 'GET',
        headers: {
          Authorization: Bearer `${token},
        `},
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Fetch User by Token</h1>
      <div>
        <input
          type="text"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button onClick={fetchUser} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch User'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h2>User Details</h2>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Test;