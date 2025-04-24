import React, { useState, useEffect} from 'react'

const Test = ({api}) => {
    const [data, setData] = useState([])
    const [erro, seterro] = useState("")
  

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`${api}/cart`, requestOptions)
            .then(response => response.text())
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
