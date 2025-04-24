import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { useTranslation } from "react-i18next";

const Home = ({ filteredProducts, searchTerm, highlightText,addToWishList, addToCart}) => {
 
  const dispatch = useDispatch();
   const { t } = useTranslation();

  const groupByCategory = (filteredProducts) => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(filteredProducts);




  const styles = {
    container: { width: "90%", margin: "auto", marginTop:"90px", paddingRight:"20px" },
    categoryContainer: { marginBottom: "20px",background:""},
    categoryTitle: { color: "teal"},
    productsGrid: { display: "flex", flexWrap: "wrap", gap: "10px" ,border:"none", padding:"10px"},
    productBox: {
      width: "250px",
      height: "250px",
      backgroundColor: "",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
     
    },
    image: {  width: "250px",
      height: "250px",
      objectFit: "cover",
      borderRadius: "10px", },
  
    viewMoreButton: {
      display: "inline-block",
      marginTop: "10px",
      padding: "8px 15px",
      backgroundColor: "teal",
      color: "white",
      textDecoration: "none",
      borderRadius: "5px",
    },
  };

  
  return (
    <div style={styles.container}>
      {Object.keys(groupedProducts).map((category, index) => (
        <div key={index} style={styles.categoryContainer}>
          <h2 style={styles.categoryTitle}>
            {" "}
            <span
              style={{ color: "black" }}
              dangerouslySetInnerHTML={{
                __html: highlightText(category, searchTerm),
              }}
            ></span>{" "}
          </h2>
          <div style={styles.productsGrid}>
            {groupedProducts[category].slice(0, 3).map((product) => (
              
            
            ))}
            <div>
            <Link to={`/category/${category}`} style={styles.viewMoreButton}>
            {t("View More")}
          </Link>
            </div>
          </div>
         
        </div>
      ))}
    </div>
  );
};



export default Home;
