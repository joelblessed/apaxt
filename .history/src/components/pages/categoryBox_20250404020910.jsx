import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import { addToWishlist } from "../";
import SelectedProductDesktop from "./selectedProductsDesktop";
import {
  BoxContainer,
  AddtocartButton,
  MAddtocartButton,
  MAddToWishList,
  Price,
  Discount,
  DescriptionContainer,
  DescriptionTitle,
  DescriptionContent,
  StatusContainer,
  StatusContent,
  StatusTitle,
  CloseButton,
  Name,
  positions,
  fontSizes,
  IfontSize,
  Iposition,
  categoryShadow,
} from "./styledComponents";
import { addToCart, removeFromCart } from "../../cartSlice";
import e from "cors";

const CategoryBox = ({
  api,
  loading,
  add,
  images,
  filteredProducts,
  SelectedProduct,
  addToCart,
  addToWishList,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
  selectedCategory,
  Fortop,

  toggleLike,
  show,
  handleProductClick,
  handleProductHid,
  Mobject,
  Dobject,
  Dobject1,
  isMobile,
  setSelectedProduct,
  selectedProduct,
  showDetails,
  position,
  fontSize,
}) => {
  const userId = localStorage.getItem("userId");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); // Function to check screen size
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 20;

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
      padding: "0px",
      marginTop: "50px",
      margin: "5px",
    },
    Categorycontainer: {
      width: "90%",
      margin: "auto",
      marginTop: "90px",
      paddingRight: "20px",
    },
    categoryContainer: { marginBottom: "20px", background: "" },
    categoryTitle: { color: "teal" },
    productsGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      border: "none",
      padding: "10px",
    },
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
    image: {
      width: "250px",
      height: "250px",
      objectFit: "cover",
      borderRadius: "10px",
    },

    viewMoreButton: {
      display: "inline-block",
      marginTop: "10px",
      padding: "8px 15px",
      backgroundColor: "teal",
      color: "white",
      textDecoration: "none",
      borderRadius: "5px",
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
    <>
      {isMobile ? (
  <MobileCard
  addToCartAPI={addToCartAPI}
  addToCartBeforeLogin={addToCartBeforeLogin}
  addToWishlist={addToWishlist}
  Mobject={Mobject}
  handleProductClick={handleProductClick}
  show={show}
  position={position}
  Iposition={Iposition}
  userId={userId}
  highlightText={highlightText}
  searchTerm={searchTerm}
  fontSize={fontSize}
  IfontSize={IfontSize}
  showDetails={showDetails}
  maxLength={maxLength}
  isExpanded={isExpanded}

/>
      ) : (
        <div style={styles.container}>
          {Dobject.map((category, index) => (
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
                {Dobject1[category]?.map((product) => (
                  <React.Fragment>
                    {
                      <div className="animated-box" style={styles.container}>
                        <div>
                          {/* selected Product */}
                          {selectedProduct === product && (
                            <div>
                              <SelectedProductDesktop
                                selectedProduct={selectedProduct}
                                handleProductHid={handleProductHid}
                              />
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
                                      cursor: "pointer",
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
                                          isExpanded
                                            ? product.name
                                            : product.name.slice(0, maxLength),
                                          searchTerm
                                        ),
                                      }}
                                    ></span>{" "}
                                  </Name>
                                  <DescriptionContainer>
                                    <DescriptionTitle>
                                      {t("Description")}:
                                      <DescriptionContent>
                                        {isExpanded
                                          ? product.description
                                          : product.description.slice(
                                              0,
                                              maxLength
                                            ) + "..."}
                                      </DescriptionContent>
                                    </DescriptionTitle>
                                  </DescriptionContainer>
                                  <StatusContainer>
                                    <StatusTitle>
                                      {t("Status")}:
                                      <StatusContent>
                                        {product.status}
                                      </StatusContent>
                                    </StatusTitle>
                                  </StatusContainer>
                                  <Price key={index}>
                                    {t("CFA")}:{" "}
                                    {product.price - product.discount}
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
                                          onClick={() =>
                                            toggleLike(selectedProduct)
                                          }
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
                                  onClick={() =>
                                    dispatch(addToCartAPI(product))
                                  }
                                >
                                  {t("Add To Cart")}
                                </AddtocartButton>
                              </div>
                            </BoxContainer>
                          )}
                        </div>

                        {selectedProduct && showDetails && selectedProduct && (
                          <></>
                        )}
                      </div>
                    }

                    {/* {product.isSelected ? "Unselect" : "Select"} */}
                  </React.Fragment>
                ))}
                <div>
                  <Link
                    to={`/category/${category}`}
                    style={styles.viewMoreButton}
                  >
                    {t("View More")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
const style = {
  sliderSettings: {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite looping
    speed: 100, // Transition speed (ms)
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image per action
    autoplay: true,
    autoplaySpeed: 3000, // Autoplay speed (ms)
  },
  buttonsContainer: {
    display: "flex",
  },
  buttons: {
    color: "orangered",
    background: "none",
    border: "2px solid orangered",
    margin: "10px",
    borderRadius: "10px",
    before: "+",
  },
};

export default CategoryBox;
