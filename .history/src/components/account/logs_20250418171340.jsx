import react, { useState } from 'react'

const Logs = () => {

  const [logs, setLogs] = useState([]);

useEffect(() => {
    
  fetch('http://localhost:5000/logs/2'),{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => setLogs(red))
  .catch(error => console.error('Error fetching logs:', error));
}, []);

  return (
    <div> 
      
    </div>
  )
}

export default Logs
