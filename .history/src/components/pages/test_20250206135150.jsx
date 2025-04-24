import React, { useState, useEffect} from 'react'

const Test = () => {
    const [data, setData] = useState([])
    const [erro, seterro] = useState("")
  

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:5000/cart", requestOptions)
            .then(response => response.text())
            .then(result => { setData(result)})
            .catch(error => { seterro('error', error)});
      }, []);
  
      
     
  return (
    
  )
}

export default Test
