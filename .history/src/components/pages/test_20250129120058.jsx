import React, { useState, useEffect} from 'react'

const Test = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        
      }, []);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
     
  return (
    <div>
        <h1>seeen</h1>
      {data}
    </div>
  )
}

export default Test
