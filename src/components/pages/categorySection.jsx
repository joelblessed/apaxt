import React from 'react';
import BrandSection from './brandSection';

const CategorySection = ({ category, brands, SelectedProduct }) => {
  return (
    <section className="category-section">
      <h2 className="category-title">{category}</h2>
      <div className="brands-container">
        {Object.entries(brands).map(([brand, products]) => (
          <BrandSection 
            key={brand}
            brand={brand}
            products={products}
        SelectedProduct={SelectedProduct}
        

          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;