import React from 'react';
import { Helmet } from 'react-helmet-async';

// ...existing code...
const getCategoryName = (cat) => {
  if (!cat) return "";
  if (typeof cat === "string") return cat;
  if (typeof cat === "object" && cat.name) return cat.name;
  return "";
};

const CategoryStructureData = ({ category }) => {
  const categoryName = getCategoryName(category);
  const bannerImage = category?.bannerImage || "";

  return (
    <div>
      <Helmet>
        <title>{`Best ${categoryName} Collection | ApaxT`}</title>
        <meta
          name="description"
          content={`Shop the best ${categoryName} at ApaxT with affordable Prices.`}
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content={`Best ${categoryName} Collection | Apaxt`}
        />
        <meta
          property="og:description"
          content={`Shop the best ${categoryName} at ApaxT With affordable Prices.`}
        />
        <meta property="og:image" content={bannerImage} />
        <meta
          property="og:url"
          content={`https://apaxt.com/category/${categoryName}`}
        />
        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://apaxt.com/category/${categoryName}`}
        />
      </Helmet>
    </div>
  );
};


export default CategoryStructureData;