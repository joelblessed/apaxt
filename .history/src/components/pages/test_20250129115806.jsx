import React from 'react'

const Test = () => {
    const [data, setData]
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
      
    </div>
  )
}

export default Test
