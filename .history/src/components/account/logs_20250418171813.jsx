import React, { useEffect } from 'react'

const Logs = ({api}) => {
  useEffect(() => {
    fetch(`${api}/logs/2')
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
