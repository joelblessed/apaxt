import React from 'react'

const Home = ({productsBySeller}) => {
  return (
    <div>
      {productsBySeller.map((products))}
      
    </div>
  )
}

export default Home
