import React from 'react';
import { Helmet } from 'react-helmet-async';

const CategoryStructureData = ({ category}) => {


  


  return (
    <div>
          <Helmet>
      <title>Best {category.name} Collection | ApaxT</title>
      <meta name="description" content={`Shop the best ${category} at ApaxT with affordatble Prices .`} />
    
      {/* Open Graph */}
      <meta property="og:title" content={`Best ${category} Collection | Apaxt`} />
      <meta property="og:description" content={`Shop the best ${category} at ApaxT With affordable Prices.`} />
      <meta property="og:image" content={category.bannerImage} />
      <meta property="og:url" content={`https://apaxt.com/category/${category}`} />
    
      {/* Canonical URL */}
      <link rel="canonical" href={`https://apaxt.com/category/${category}`} />
    </Helmet>
    </div>
  );
};

export default CategoryStructureData;