import React from 'react'

const Home = ({filter}) => {
  return (
    <div>
      {filter.map((product,index) =>(
        <a>product.name</a>
      ))}
      
    </div>
  )
}

export default Home
