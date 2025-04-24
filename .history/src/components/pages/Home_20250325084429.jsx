import React from 'react'

const Home = ({filtere}) => {
  return (
    <div>
      {filtere.map((product,index) =>(
        <a>product.name</a>
      ))}
      
    </div>
  )
}

export default Home
