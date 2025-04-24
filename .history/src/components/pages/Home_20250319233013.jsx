import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";

const Home = ({ filteredProducts, searchTerm, highlightText,addToWishList, addToCart}) => {
 
  const dispatch = useDispatch();

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
              <div style={{border:"1px solid green",borderRadius:"12px", boxShadow:"0px 0px 10px 1px green"}}>
              <div key={product.id} style={styles.productBox}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={styles.image}
                />
               
              </div>
            {/* text */}
                <div style={{ display: "flex" }}>
                  <div
                    className="text"
                    style={{
                      background:
                        " linear-gradient(45deg,white 33%, white 33%, #86a8e7 66%, #91eae4 66%)",
                      borderRadius: "10PX",
                      width: "215px",
                      height: "100px",
                      paddingLeft:"10px"
                    }}
                  >
                    <h5 className="name">
                      <span
                        style={{ color: "black" }}
                        dangerouslySetInnerHTML={{
                          __html: highlightText(product.name, searchTerm),
                        }}
                      ></span>{" "}
                    </h5>
                    <h6>{t("Description")} {product.desc}</h6>
                    <h6>: {t("")} {product.price} </h6>
                  </div>

                  {/* like and wishlist */}
                  <div style={{background:"white", height:"100px"}}>
                    <div>
                      <button style={{background:"none", border:"0px"}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="red"
                        >
                          <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <button
                        style={{
                          background: "transparent",
                          border: "0px solid blue",
                          color: "orange",
                          padding: "0px 0px",
                          background: "none",
                          borderRadius: "10px 10px 10px 10px ",
                          cursor: "pointer",
                          fontSize: "40px",
                          transition: "all 0.3s ease",
                          marginRight: "auto",
                          width:"35px"
                        }}
                        onClick={() => addToWishList(product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>


                <div style={{ background: "" }}>
                  <button
                    style={{
                      background: "white",
                      border: "1px solid green",
                      color: "red",
                      padding: "10px 20px",
                      borderRadius: "0px 0px 10px 10px ",
                      cursor: "pointer",
                      fontSize: "100%",
                      transition: "all 0.3s ease",
                      width: "100%",
                    }}
                    
                     // onClick={() => addToCart(product)}
                     onClick={() => dispatch(addToCartBeforeLogin(product))}
                  >
                    addToCart
                  </button>
                </div>

            </div>
            
            ))}
            <div>
            <Link to={`/category/${category}`} style={styles.viewMoreButton}>
            View More
          </Link>
            </div>
          </div>
         
        </div>
      ))}
    </div>
  );
};



export default Home;
