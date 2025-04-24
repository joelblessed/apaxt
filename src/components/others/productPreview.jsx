// import React, { useEffect } from 'react';
// import useLocalStorage from "use-local-storage";

// function ProductPreview( {selectedProduct}) {
//   const [product, setProduct] = useLocalStorage(selectedProduct);

//   useEffect (() =>{
//     window.localStorage.setItem("product" , JSON.stringify (product))
//   },[product])

//   // Function to update the product state
//   const updateProduct = (newProduct) => {
//     setProduct(newProduct);
//   };

//   return (
//     <div>
//       <h2>{product.name}</h2>
//       {product.image && <img src={product.image} alt={product.name} />}
//       <p>{product.description}</p>
//       {/* Add functionality to update the product as needed */}
//     </div>
//   );
// }

// export default ProductPreview;