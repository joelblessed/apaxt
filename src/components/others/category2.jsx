import React, { useState } from "react";

function Category({items,selectedCategory, addToCart, searchTerm, handleProductClick, highlightText}) {
 

  // Filter items based on category
//   const filteredItems = 
//     selectedCategory === "All"
//       ? items
//       : items.filter((item) => item.category === selectedCategory);
const filteredItems = items.filter(
        (items) =>
        (selectedCategory === "All"|| items.Category === selectedCategory) &&
        items.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  return (
    <div>
      <h1>Search Items by Category</h1>

      {/* Dropdown for selecting category */}
      {/* <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
      </select> */}

      {/* Render filtered items */}
      <ul>
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
      </ul>
    </div>
  );
}

export default Category;