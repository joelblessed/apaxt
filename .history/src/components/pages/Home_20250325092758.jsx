import React from 'react'

const Home = ({filteredProductsBySeller}) => {
  const [products, S]
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.owner === ownerId);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [ownerId]);
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
