import React, { useEffect, useState } from 'react';
import "./products.css"
import { useNavigate } from 'react-router-dom';


const Products = ({filteredProducts, setSelectedProduct , addToCart, handleShowAlert ,showAlert, searchTerm, highlightText}) => {

  

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    
// const DataContext = createContext();

  // Handle product click
  // const {setSelectedProduct} = useContext(DataContext)
  
  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct")
  };


    useEffect(() => {
        // Fetch images from the local API
        fetch('http://localhost:5000/products?_sort=_id&_order=desc') // Adjust the URL if necessary
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                alert('could not load products');
                setLoading(false);
            });
    }, []);

    

  return (
    <>
  

    <div className='box1'>
            <h1></h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                
                <div style={{ display: 'flex', flexWrap: 'wrap' }}   >
                    
                    {/* <div>
                        <a className='btn btn-primary btn-sm me-1' href="">
                            Edit
                        </a>
                        <button type='button' className='btn btn-danger btn-sm'>Delete</button>
                    </div> */}
                  {filteredProducts.map((product, index) => (
                    
                    <div key={products._id} className='box2'  >
                       
                    <img className='image'
                        src={'http://localhost:5000/images/'+product.image}
                        alt={product.name}
                        onClick={() => handleProductClick(product)}
                       
                        />
                         <span className='text'>
                            <a  className='name'><span style={{color:"black"}} 
                                dangerouslySetInnerHTML={{
                                __html: highlightText(product.name, searchTerm),
                                       }}
                                 ></span> </a>
                            <a>Description: {product.desc}</a>
                            <a>Price: {product.price}</a>
                         </span>
                         <div className='cart'>
                            <button className='btn btn-warning' onClick={ () => addToCart(product)} >Add to Cart</button>
                            
                         </div>
                          
                         
                    </div>

                  ))}
                  
                  <button onClick={handleShowAlert}>Show Custom Alert</button>
      {showAlert && (
        <div style={{ padding: "10px", backgroundColor: "red", color: "white" }}>
          This is a custom alert!
        </div>
      )}
      

            <h3>Total: ${totalPrice}</h3> 
     
                </div>
               
            )}
            
        </div > 
        {/* <div style={{display:""}}>
        {cart.map((item, index) => (
        <ProductView key={index}
      id={item.id} name={item.name} desc={item.desc} price={item.price} numberInStock={item.quantity}  />
        
      ))}
        </div> */}  {/* <div style={{display:""}}>
        {cart.map((item, index) => (
        <ProductView key={index}
      id={item.id} name={item.name} desc={item.desc} price={item.price} numberInStock={item.quantity}  />
        
      ))}
        </div> */}


      
        
        </>
  )
}

export default Products