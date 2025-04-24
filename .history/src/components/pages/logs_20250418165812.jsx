import React from 'react'

const Logs = () => {

  fetch('http://localhost:5000/logs/user123')
  .then(response => response.json())
  .then(data => console.log('User logs:', data))
  .catch(error => console.error('Error fetching logs:', error));
  return (
    <div>
      
    </div>
  )
}

export default Logs
