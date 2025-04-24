import React, { useEffect, useState } from 'react';

const Logs = ({ api }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    fetch(`${api}/logs/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user logs');
        }
        return response.json();
      })
      .then(data => {
        setLogs(data);
      })
      .catch(err => {
        setError('Error fetching logs');
        console.error('Error fetching logs:', err);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Loading user logs...</p>;
  if (error) return <p>{error}</p>;
  if (logs.length === 0) return <p>No logs found for this user.</p>;

  return (
    <div>
      <h3>User Logs</h3>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            Action: <strong>{log.action}</strong> <br />
            Time: {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;