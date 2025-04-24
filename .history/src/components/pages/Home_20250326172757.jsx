import React, { createContext, useEffect, useState } from "react";


const Home = ({api,brands,filteredProducts, ownersProducts}) => {
  // const [products, setProducts] = useState([])
  // const owner = 9
  // useEffect(() => {
  //   fetch(`${api}/products`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filteredProducts = data.filter((product) => product.ownerId === owner);
  //       setProducts(filteredProducts);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, [owner]);
  const id = localStorage.getItem("userId");
  return (
  
    <div>
      {ownersProducts.map((product,index) =>(
        <div key={index}>
          {product.name},
          {product.ownerId}
        </div>
      ))}
      {/* {filteredProducts.map((product,index)=>(
       <div> {product.brand.map((brand,index) =>(
          <h4 key={index}>{brand.name}</h4>
       ))}</div>
      
      ))} */}
      {brands.map((brand,index)=>(
        <h4 key> {brand.name}</h4>
      ))}
    </div>
  )
}

export default Home
