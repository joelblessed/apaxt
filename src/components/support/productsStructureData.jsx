import React from 'react';
import { Helmet } from 'react-helmet-async';

const ProductStructuredData = ({ product }) => {
  const firstUserProduct = product.user_products?.[0];

  if (!product || !firstUserProduct) return null;

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "sku": product.id.toString(),
    "mpn": product.id.toString(),
    "brand": {
      "@type": "Brand",
      "name": product.brand?.name || "Unknown"
    },
    "category": `${product.category?.main} > ${product.category?.sub}`,
    "image": product.images,
    "offers": {
      "@type": "Offer",
      "url": `https://apaxt.com/product/${product.id}-${product.name}`,
      "priceCurrency": "XAF",
      "price": firstUserProduct.price,
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": firstUserProduct.owner,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": firstUserProduct.address,
          "addressLocality": firstUserProduct.city,
          "addressCountry": "CM"
        },
        "telephone": firstUserProduct.phone_number
      }
    }
  };

  return (
 
     <Helmet>
  {/* Primary Meta Tags */}
  <title>{product.name} | Buy Online | [Brand Name]</title>
  <meta name="description" content={`Buy ${product.name} for $${product.price}. ${product.shortDescription}. Free shipping & 30-day returns.`} />

  {/* Open Graph */}
  <meta property="og:title" content={`${product.name} | Buy Online | [Brand Name]`} />
  <meta property="og:description" content={`Buy ${product.name} for $${product.price}. ${product.shortDescription}. Free shipping & 30-day returns.`} />
  <meta property="og:image" content={product.images[0]} />
  <meta property="og:url" content={`https://apaxt.com/products/${product.slug}`} />
  <meta property="og:type" content="product" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${product.name} | Buy Online | [Brand Name]`} />
  <meta name="twitter:description" content={`Buy ${product.name} for $${product.price}. ${product.shortDescription}. Free shipping & 30-day returns.`} />
  <meta name="twitter:image" content={product.images[0]} />

  {/* Schema.org (Google Rich Snippets) */}


  {/* Canonical URL */}
  <link rel="canonical" href={`https://apaxt.com/products/${product.slug}`
} />

    <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
</Helmet>
  
    
  );
};

export default ProductStructuredData;