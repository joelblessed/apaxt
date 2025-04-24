import React, { useState, useEffect } from "react";

const Test = ({ filteredProducts, api }) => {

    const [products, setProducts] = useState({});
  
    // useEffect(() => {
    //   // Fetch products from db.json
    //   fetch(`${api}/products?_sort=_id&_order=desc`)
    //     .then(response => response.json())
    //     .then(data => setProducts(data.products));
    // }, []);
  
    const handleSelect = (id) => {
      const updatedProducts = products.map(product =>
        product.id === id ? { ...product, isSelected: !product.isSelected } : product
      );
      setProducts(updatedProducts);
    };
  
    useEffect(() => {
      const handleBeforeUnload = () => {
        // Unselect all products before the page is closed
        const unselectedProducts = products.map(product => ({ ...product, isSelected: false }));
        setProducts(unselectedProducts);
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [products]);
  
    return (
      <div>
        <h1>Products</h1>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name}
              <button onClick={() => handleSelect(product.id)}>
                {product.isSelected ? 'Unselect' : 'Select'}
              </button>
              {product.isSelected && <span> (Selected)</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default Test