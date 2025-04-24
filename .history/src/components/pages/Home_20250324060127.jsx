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
              
              <React.Fragment>
                        {
                          <div className="animated-box" style={styles.container}>
                            {filteredProducts.length > 0 ? (
                              filteredProducts.map((product, index) => (
                                <div>
                                  {selectedProduct === product && (
                                    <div
                                      style={{
                                        padding: "20px",
                                        margin: "0 auto",
                                        marginTop: "0px",
                                        Width: "40%",
                                        maxHeight: "100vh",
                                        border: "1px solid green",
                                        borderRadius: "20px",
                                        // background:'red',
                                        boxShadow: "10px 0px 50px 0px pink",
                                      }}
                                    >
                                      <div style={{ display: "flex" }}>
                                        <div style={{ background: "", width: "400px" }}>
                                          {selectedProduct.images &&
                                          selectedProduct.images.length > 0 ? (
                                            <Slider {...style.sliderSettings}>
                                              {selectedProduct.images.map((imgUrl, index) => (
                                                <div key={index}>
                                                  <img
                                                    src={imgUrl}
                                                    alt={`${selectedProduct.title} - Image ${
                                                      index + 1
                                                    }`}
                                                    style={{
                                                      width: "400px",
                                                      height: "450px",
                                                      borderRadius: "8px",
                                                    }}
                                                  />
                                                </div>
                                              ))}
                                            </Slider>
                                          ) : (
                                            <p>No images available</p>
                                          )}
                                        </div>
                                        <div>{SelectedProduct}</div>
                                        <div
                                          style={{
                                            background: "#4ECDC4",
                                            width: "500px",
                                            marginLeft: "30px",
                                          }}
                                        >
                                          <div style={{ padding: "20px", margin: "0 auto" }}>
                                            <CloseButton
                                              style={{
                                                position: "relative",
                                                left: "420px",
                                                top: "-40px",
                                                background: "none",
                                                borderRadius: "0px 14px 10px 10px",
                                                width: "80px",
                                                border: "1px solid red",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                                fontSize: "30px",
                                                color: "red",
                                              }}
                                              onClick={() => hanldleProductHid()}
                                            >
                                              {t("close")}
                                            </CloseButton>
                                            <h1>{selectedProduct.name}</h1>
                                            <p>{selectedProduct.description}</p>
                                            <p>
                                              <strong>Price:</strong> {selectedProduct.price}
                                            </p>
                                          </div>
                                          <div style={style.buttonsContainer}>
                                            <div>
                                              <button
                                                style={style.buttons}
                                                onClick={() =>
                                                  dispatch(
                                                    addToCartBeforeLogin(selectedProduct)
                                                  )
                                                }
                                              >
                                                Add To Cart
                                              </button>
                                            </div>
                                            <div>
                                              <button
                                                style={{ ...style.buttons }}
                                                onClick={() => dispatch(selectedProduct)}
                                              >
                                                [add To WishList]
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {product !== selectedProduct && (
                                    <BoxContainer
                                      key={index}
                                      categoryOption={categoryShadow[product.category]}
                                    >
                                      <div
                                        key={index}
                                        style={{
                                          ...styles.box,
              
                                          // justifyContent:
                                          // index === filteredProducts.length - 1 ? "space-evenly" : {}, // Apply style only to the last box
                                        }}
                                      >
                                        {product.images.length > 0 ? (
                                          <img
                                            src={product.images[0]} // Display first image only
                                            alt={product.name}
                                            style={{
                                              width: "250px",
                                              height: "250px",
                                              objectFit: "cover",
                                              borderRadius: "10px",
                                              cursor:"pointer",
                                            }}
                                            onClick={() => {
                                              setSelectedProduct(product);
              
                                              show();
                                            }}
                                          />
                                        ) : (
                                          <p>{t("No Image Available")}</p>
                                        )}
                                      </div>
              
                                      {/* text */}
                                      <div style={{ display: "flex" }}>
                                        <div
                                          className="text"
                                          style={{
                                            borderRadius: "10PX",
                                            width: "100%",
                                            height: "100px",
                                            //  background:"red",
                                            padding: "10px",
                                          }}
                                        >
                                          <Name className="name">
                                            <span
                                              style={{ color: "black" }}
                                              dangerouslySetInnerHTML={{
                                                __html: highlightText(
                                                  product.name,
                                                  searchTerm
                                                ),
                                              }}
                                            ></span>{" "}
                                          </Name>
                                          <DescriptionContainer>
                                            <DescriptionTitle>
                                              {t("Description")}:
                                              <DescriptionContent>
                                                {product.description}
                                              </DescriptionContent>
                                            </DescriptionTitle>
                                          </DescriptionContainer>
                                          <StatusContainer>
                                            <StatusTitle>
                                              {t("Status")}:
                                              <StatusContent>{product.status}</StatusContent>
                                            </StatusTitle>
                                          </StatusContainer>
                                          <Price key={index}>
                                            {t("CFA")}: {product.price - product.discount}
                                          </Price>
                                          {product.discount > 0 && (
                                            <Discount key={index}>
                                              {t("CFA")}:<s>{product.price}</s>
                                              <label
                                                style={{
                                                  width: "40px",
                                                  height: "20px",
                                                  background: "#90EE90",
                                                  textAlign: "center",
                                                  borderRadius: "5px",
                                                  marginLeft: "15px",
                                                }}
                                              >
                                                -
                                                {(
                                                  (product.discount / product.price) *
                                                  100
                                                ).toFixed(0)}
                                                %
                                              </label>
                                            </Discount>
                                          )}
                                        </div>
              
                                        {/* like and wishlist */}
                                        <div style={{ background: "" }}>
                                          <div>
                                            {/* Product Display */}
              
                                            {selectedProduct === product && (
                                              <div>
                                                <button
                                                  onClick={() => toggleLike(selectedProduct)}
                                                  styles={{
                                                    border: "0px",
                                                    background: "red",
                                                  }}
                                                >
                                                  {selectedProduct.likedBy.some(
                                                    (user) => user.userId === userId
                                                  )
                                                    ? "❤️"
                                                    : "🤍"}
                                                  {product.likes}
                                                </button>
                                              </div>
                                            )}
                                          </div>
                                          <div>
                                            <button
                                              style={{
                                                background: "transparent",
                                                border: "0px solid orange",
                                                color: "orange",
                                                padding: "0px 0px",
                                                background: "none",
                                                borderRadius: "10px 10px 10px 10px ",
                                                cursor: "pointer",
                                                fontSize: "40px",
                                                transition: "all 0.3s ease",
                                                marginRight: "auto",
                                                width: "35px",
                                              }}
                                              onClick={() =>
                                                dispatch(addToCartBeforeLogin(product))
                                              }
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>
              
                                      <div
                                        style={{
                                          background: "",
                                          textAlign: "center",
                                          padding: "5px",
                                        }}
                                      >
                                        <AddtocartButton
                                          main={product.discount > 0}
                                          onClick={() => dispatch(addToCartAPI(product))}
                                        >
                                          {t("Add To Cart")}
                                        </AddtocartButton>
                                      </div>
                                    </BoxContainer>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p>{t("Loading...")}</p>
                            )}
              
                            {selectedProduct && showDetails && selectedProduct && <></>}
                          </div>
                        }
              
                        {/* {product.isSelected ? "Unselect" : "Select"} */}
                      </React.Fragment>
            
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
