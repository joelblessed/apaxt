import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogComponent = () => {
  const [formData, setFormData] = useState({
    userId: '',
    action: '',
    productId: ''
  });
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/logs', formData);
      setSuccess('Log added successfully!');
      // Refresh logs after successful submission
      fetchUserLogs(formData.userId);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit log');
    }
  };

  const fetchUserLogs = async (userId) => {
    if (!userId) return;
    
    try {
      const response = await axios.get(`/logs?userId=${userId});
      if (response.data && response.data.length > 0) {
        const latestLog = response.data[response.data.length - 1];
        setLogs(latestLog.logs || []);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  useEffect(() => {
    if (formData.userId) {
      fetchUserLogs(formData.userId);
    }
  }, [formData.userId]);

  return (
    <div className="log-container">
      <h2>Log Activity</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Action:</label>
          <select
            name="action"
            value={formData.action}
            onChange={handleChange}
            required
          >
            <option value="">Select an action</option>
            <option value="view">View</option>
            <option value="add">Add</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>

        <div className="form-group">
          <label>Product ID (optional):</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit Log</button>
      </form>

      <div className="logs-display">
        <h3>Recent Logs for User: {formData.userId || 'None selected'}</h3>
        {logs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Action</th>
                <th>Product ID</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.action}</td>
                  <td>{log.productId || 'N/A'}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No logs found for this user</p>
        )}
      </div>
    </div>
  );
};

export default LogComponent;