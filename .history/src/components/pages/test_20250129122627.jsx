import React, { useState, useEffect} from 'react'

const Test = () => {
    const [data, setData] = useState([])
    const [erro, seterro] = useState("")
  

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:5000/products", requestOptions)
            .then(response => response)
            .then(result => { setData(result)})
            .catch(error => { seterro('error', error)});
      }, []);
  
      
     
  return (
    <div>
        <h1>seeen</h1>
        {erro}
      {data}
    </div>
  )
}

export default Test
