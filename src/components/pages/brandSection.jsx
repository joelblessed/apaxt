import React from 'react';
import ProductCard from './ProductCards/productCard';
import Box from './boxes';

const BrandSection = ({ brand, products, highlightText }) => {
  return (
    <div className="brand-section">
      <h3 className="brand-title">{brand}</h3>
      <div className="products-grid">
      
         <Box
               Mobject={products}
               Dobject={products}
              
             
               highlightText={highlightText}
              
            
             />
    
      </div>
    </div>
  );
};

export default BrandSection;