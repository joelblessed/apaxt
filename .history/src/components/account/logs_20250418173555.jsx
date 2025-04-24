import React, { useEffect, useState } from "react";

const Logs = ({ api }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.warn("No userId found in localStorage");
      return;
    }

    console.log(`Fetching logs for userId: ${userId}`);
    fetch(`${api}/logs/${userId}`)
      .then((response) => {
        console.log("Received response:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch user logs");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched logs data:", data);
        setLogs(data);
      })
      .catch((err) => {
        setError("Error fetching logs");
        console.error("Error fetching logs:", err);
      })
      .finally(() => {
        console.log("Fetch logs operation completed");
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    console.log("Loading user logs...");
    return <p>Loading user logs...</p>;
  }
  if (error) {
    console.error("Error state:", error);
    return <p>{error}</p>;
  }
  if (logs.length === 0) {
    console.log("No logs found for this user.");
    return <p>No logs found for this user.</p>;
  }

  return (
    <div>
      <h3>User Logs</h3>
      <ul>
        {logs.map((log) => (
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
