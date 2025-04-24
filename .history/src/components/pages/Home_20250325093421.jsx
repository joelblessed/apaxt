import React, { createContext, useEffect, useState } from "react";


const Home = ({filteredProductsBySeller}) => {
  
  const owner = 2
  useEffect(() => {
    fetch("http://localhost:5000/owproducts")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.ownerId === owner);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [owner]);
  return (
    
    <div>
      {products.map((product,index) =>(
        <div key={index}>
          {product.name},
          {product.ownerId}
        </div>
      ))}
      
    </div>
  )
}

export default Home
