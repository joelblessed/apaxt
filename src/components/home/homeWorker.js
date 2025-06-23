// // groupingWorker.js
// const groupByCategory = (products) => {
//     return products.reduce((acc, product) => {
//       if (!acc[product.category]) acc[product.category] = [];
//       acc[product.category].push(product);
//       return acc;
//     }, {});
//   };
  
//   const groupByBrand = (products) => {
//     return products.reduce((acc, product) => {
//       product.brand.forEach((brand) => {
//         if (!acc[brand.name]) acc[brand.name] = [];
//         acc[brand.name].push(product);
//       });
//       return acc;
//     }, {});
//   };
  
//   onmessage = (event) => {
//     const { type, products } = event.data;
    
//     if (type === 'groupByCategory') {
//       const result = groupByCategory(products);
//       postMessage({ type: 'groupByCategory', result });
//     } else if (type === 'groupByBrand') {
//       const result = groupByBrand(products);
//       postMessage({ type: 'groupByBrand', result });
//     }
//   };






//   <div style={{ display: "flex" }}>
//       <div style={{ padding: "1rem", fontFamily: "Arial" }}>
//       <h2>Categories → Subcategories → Brands (Unique)</h2>
//       {Object.entries(nestedCategoryStructure).map(([mainCategory, subCategoryMap]) => (
//         <div key={mainCategory} style={{ marginBottom: "1.5rem" }}>
//           <h3>{mainCategory}</h3>
//           <div style={{ paddingLeft: "1rem" }}>
//             {Object.entries(subCategoryMap).map(([subCategory, brands]) => (
//               <div key={subCategory} style={{ marginBottom: "1rem" }}>
//                 <h4>↳ {subCategory}</h4>
//                 <ul>
                
//                   {brands.map((brand) => (
//                     <li key={brand}>{brand}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>



