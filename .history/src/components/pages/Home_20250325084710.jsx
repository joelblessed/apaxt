import React from 'react'

const Home = ({filteredProductsBySeller}) => {
  return (
    <div>
      {filteredProductsBySeller.map((product,index) =>(
        <div key={index}></div>
      ))}
      
    </div>
  )
}

export default Home
