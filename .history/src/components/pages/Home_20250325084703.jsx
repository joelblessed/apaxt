import React from 'react'

const Home = ({filteredProductsBySeller}) => {
  return (
    <div>
      {filteredProductsBySeller.map((product,index) =>(
        <div ></div>
      ))}
      
    </div>
  )
}

export default Home
