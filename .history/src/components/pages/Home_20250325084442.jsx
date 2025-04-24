import React from 'react'

const Home = ({filterProductsByS}) => {
  return (
    <div>
      {filterProductsByS.map((product,index) =>(
        <a>product.name</a>
      ))}
      
    </div>
  )
}

export default Home
