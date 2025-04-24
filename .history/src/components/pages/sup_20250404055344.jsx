import React from 'react'

const Sup = () => {
  return (
    <div>
        {filteredProducts.map((p,i)=>(
            <a key={i}>{p.name}</a>
        ))}
      <h4>hello me</h4>
    </div>
  )
}

export default Sup
