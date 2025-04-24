import React from 'react'

const Home = ({filteredProductsBySeller}) => {
  return (
    <div>
      {filteredProductsBySeller.map((product,index) =>(
        <div key={index}>
          {product.name}
          
        </div>
      ))}
      
    </div>
  )
}

export default Home
