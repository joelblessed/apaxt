import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for ReactDOM
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "./components/translations/i18n";

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();















//         {/* Shop by Category */}
// <SectionTitle>Shop by Category</SectionTitle>

//         {Object.entries(groupedProducts).map(([category, subCategories]) => (
//           <CategoryGrid>
//             <CategoryCard>
//               <CategoryImage src={"sgfgf"} alt={"   "} />
//               <CategoryName >
//               {category}
                
//               </CategoryName>
//             </CategoryCard>
//           </CategoryGrid>
//         ))}





//   {Object.entries(groupedProducts).map(([category, subcategories]) => (
//     <CategoryCard>
//   <CategoryGrid key={category}>
//     <CategoryCard>{category}</CategoryCard>
//     {Object.entries(subcategories).map(([subcat, brands]) => (
//       <div key={subcat} style={{ paddingLeft: '1rem' }}>
//         <CategoryCard>{subcat}</CategoryCard>
//         {Object.entries(brands).map(([brand, products]) => (
//           <div key={brand} style={{ paddingLeft: '2rem' }}>
//             <CategoryName>{brand}</CategoryName>
           
//           </div>
//         ))}
//       </div>
//     ))}
//   </CategoryGrid>
//   </CategoryCard>
// ))}
