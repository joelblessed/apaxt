import React from 'react'

const Home = ({filteredProductsBySeller}) => {
  return (
    
    <div>
      {filteredProductsBySeller.map((product,index) =>(
        <div key={index}>
          {product.name},
          {product.ownerId}
        </div>
      ))}
      
    </div>
  )
}

export default Home
