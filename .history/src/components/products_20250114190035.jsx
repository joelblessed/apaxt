import React, { useEffect, useState } from 'react';

const Products = () => {



    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        // Fetch images from the local API
        fetch('http://localhost:5000/products') // Adjust the URL if necessary
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                setLoading(false);
            });
    }, []);

  return (
    <div>
            <h1>Imagelery</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                  {products.map((product, index) => (
                    
                    <div key={products._id} style={{background:"red", margin:"10px", height:"200px",width:"200px"}}>
                       
                    <img
                        src={'http://localhost:5000/products/'+product.imageName}
                        alt={product.name}
                        style={{ width: '200px', height: '150px', borderRadius: '8px' }}
                      
                        />
                         <span>
                            <div><a>{product.name}</a></div>
                            <div><a>{product.desc}</a></div>
                         </span>
                         
                    </div>

            
                  ))}
                  
         
        
                   
                </div>
               
            )}
        </div> 
  )
}

export default Products
