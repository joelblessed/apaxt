import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CategoryBox from "./categoryBox";


const Category = ({
  filteredProducts,
  mobilefilteredProducts,
  highlightText,
  SelectedProduct,
  api,
  
}) => {
 
const navigate = useNavigate();
const [products, setProducts] = use
 
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  // Fetch all products
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch(`${api}/products`);
        const data = await response.json();
        setProducts(data);
      };
      fetchProducts();
    }, [api]);

  const groupByCategory = (filteredProducts) => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(filteredProducts);
  // const  Dobject = Object.keys(groupedProducts).map((category) =>groupedProducts[category].slice(0,5)).flat()
  const Dobject = Object.keys(groupedProducts);
  const Dobject1 = Dobject.reduce((acc, category) => {
    acc[category] = groupedProducts[category].slice(0, 5);
    return acc;
  },{});
  return (
    <div>
      <div>
        <CategoryBox
          Mobject={mobilefilteredProducts}
          Dobject={Dobject}
          Dobject1={Dobject1}
          SelectedProduct={SelectedProduct}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default Category;
