import React from 'react'

const Home = ({filterProductsBySeller}) => {
  return (
    <div>
      {filterProductsBySeller.map((product,index) =>(
        <a>product.name</a>
      ))}
      
    </div>
  )
}

export default Home
