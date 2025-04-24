import React, { useEffect } from 'react'

const Logs = ({api}) => {
  useEffect(() => {
    fetch(`${api}/logs/2`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  )
  .then(data => console.log('Logs:', data))
  .catch(error => console.error('Error fetching logs:', error));
  }
  , [])
  useEffect(() => {
    fetch(`${api}/logs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  .then(response => response.json())
  .then(data => console.log('User logs:', data))
  .catch(error => console.error('Error fetching logs:', error));
  }
  , [])
  return (
    <div>
      
    </div>
  )
}

export default Logs
