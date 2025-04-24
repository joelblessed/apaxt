import React from 'react'

const Logs = () => {

  fetch('http://localhost:5000/logs/2'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('User logs:', data))
  .catch(error => console.error('Error fetching logs:', error));
  .then(response => response.json())
  .then(data => console.log('User logs:', data))
  .catch(error => console.error('Error fetching logs:', error));
  return (
    <div>
      
    </div>
  )
}

export default Logs
