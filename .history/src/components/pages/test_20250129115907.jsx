import React, { useState } from 'react'

const Test = () => {
    const [data, setData] = useState([])
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:5000/products/?_sort=_id&_order=desc", requestOptions)
        .then(response => response.text())
        .then(result => {setData(result)})
        .catch(error => console.log('error', error));
  return (
    <div>
        
      {data}
    </div>
  )
}

export default Test
