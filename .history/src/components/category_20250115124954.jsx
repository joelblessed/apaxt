import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Category({addToCart,searchTerm, highlightText, setSelectedProduct,selectedCategory}) {
  const [items, setItems] = useState([]);
  
  const [filteredItems, setFilteredItems] = useState([]);

  // Fetch items from db.json (JSON Server)
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data); // Store all items
        setFilteredItems(data); // Set initial filtered items
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter items based on selected category
  useEffect(() => {
    if (selectedCategory === "All" ) {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) =>( item.category === selectedCategory)) ||
      
        product.category.toLowerCase().includes(searchTerm.toLowerCase())||
        product.name .toLowerCase().includes(searchTerm.toLowerCase())
      ));
      
    }
  }, [selectedCategory, items]); // Re-run filter when category or items change

const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct")
  };

  
  return (
    <div>
      
<h1>cat</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} >
        {filteredItems.map((product) => (
            <div key={product._id} className='box2'  >
                       
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
                    <button className='btn btn-warning' onClick={() => addToCart(product)} >Add to Cart</button>
                    
                 </div>
                  
                 
            </div>
        ))}
      </div>
    </div>
  );
}

export default Category
;