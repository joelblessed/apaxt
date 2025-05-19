// groupingWorker.js
const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };
  
  const groupByBrand = (products) => {
    return products.reduce((acc, product) => {
      product.brand.forEach((brand) => {
        if (!acc[brand.name]) acc[brand.name] = [];
        acc[brand.name].push(product);
      });
      return acc;
    }, {});
  };
  
  self.onmessage = (event) => {
    const { type, products } = event.data;
    
    if (type === 'groupByCategory') {
      const result = groupByCategory(products);
      self.postMessage({ type: 'groupByCategory', result });
    } else if (type === 'groupByBrand') {
      const result = groupByBrand(products);
      self.postMessage({ type: 'groupByBrand', result });
    }
  };