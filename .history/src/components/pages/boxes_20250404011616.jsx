import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import styled, { keyframes } from "styled-components";

import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import { useTranslation } from "react-i18next";
import SelectedProductDesktop from "./selectedProductsDesktop";
import { addToWishlist } from "../../wishlistSlice";
import MobileCard from "./ProductCards/MobileCard";


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
  categoryShadow,
    iospositions,
    iosfontSizes,
} from "./styledComponents";


const Box = ({
  api,
  loading,
  add,
  images,
  filteredProducts,
  SelectedProduct,
  addToCart,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
  selectedCategory,
  Fortop,

  toggleLike,
  // show,
  handleProductClick,
  // handleProductHid,
  Mobject,
  Dobject,
  // isMobile,
  // setSelectedProduct,
  // selectedProduct,
  // showDetails,
  // position,
  // Iposition,
  // fontSize,
  // IfontSize,
}) => {
 
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); // Function to check screen size
  const [isExpanded, setIsExpanded] = useState(false);
  const userId = localStorage.getItem("userId") || "guest"; // Check user login
  const maxLength = 20;
  const [showDetails, setShowDetails] = useState(true);
   const [selectedProduct, setSelectedProduct] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef(null);
   

  
  const position = positions[i18n.language] || position.en;
  const fontSize = fontSizes[i18n.language] || fontSize.en;
  const Iposition = iospositions[i18n.language] || position.en;
  const IfontSize = iosfontSizes[i18n.language] || fontSize.en;





  // Function to check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
  
    useEffect(() => {
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize); // Update on resize
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
 
  
    const handleProductHid = () => {
      setSelectedProduct(null);
    };


    const show = (event) => {
      setShowDetails((prevShow) => !prevShow);
      if (previewRef.current && !previewRef.current.contains(event.target)) {
      }
    };

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
      marginTop: "50px",
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
       show={sh}
       position,
       Iposition,
       userId,
       highlightText,
       searchTerm,
       fontSize,
       IfontSize,
       showDetails
       />
      ) : (
        <React.Fragment>
          {
            <div className="animated-box" style={styles.container}>
              {Dobject.length > 0 ? (
                Dobject.map((product, index) => (
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
                                    : product.description.slice(0, maxLength) +
                                      "..."}
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
                                onClick={() => dispatch(addToWishlist({ productId: product.id, userId }))}
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

export default Box;
