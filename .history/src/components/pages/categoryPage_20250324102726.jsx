import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { useTranslation } from "react-i18next";
// import "./products.css";

const CategoryPage = ({api,highlightText,addToCart, addToWishList, handleProductClick, searchTerm}) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  

  useEffect(() => {
    fetch(`${api}/products`)
      .then((res) => res.json())
      .then((data) => {
        const products = data.filter((product) => product.category === categoryName);
        setProducts(products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryName]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      background: "white",
      maxWidth: "96%", // Prevents full width spread
      margin: "auto", // Centers the whole container
      padding: "20px",
      marginTop: "90px",
    },
    box: {
      width: "250px",
      height: "250px",
     
    },

    lastBox: {
      background: "blue",
      
      // Pushes last box to the left
    },
  };
  return (
    <div>
      <h1>{categoryName}</h1>
      <div className="animated-box" style={styles.container}>
        {products.length > 0 ? (
          products.map((product, index) => (
            
             <div>

      {/* {product.isSelected ? "Unselect" : "Select"} */}
    

      <Link to="/" style={styles.backButton}>Back</Link>
    </div>
  );
};


export default CategoryPage;