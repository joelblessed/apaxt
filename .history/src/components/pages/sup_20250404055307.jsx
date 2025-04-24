import React from 'react'

const Sup = (filteredProducts) => {
  return (
    <div>
        {filteredProducts.map((p,i)=>(
            <a key>{p.name}</a>
        ))}
      <h4>hello me</h4>
    </div>
  )
}

export default Sup
