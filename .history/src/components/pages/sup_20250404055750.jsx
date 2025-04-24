import React from 'react'

const Sup = ({say}) => {
  return (
    <div>
        
       
      <h4>hello me</h4>
      {say.map((p)=>(
        <div>
            {p.name}
        </div>
      ))}
    </div>
  )
}

export default Sup
