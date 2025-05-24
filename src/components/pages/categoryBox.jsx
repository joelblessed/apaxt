import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import { addToWishlist } from "../../wishlistSlice";
import SelectedProductDesktop from "./selectedProductsDesktop";
import WishlistButton from "./wishlistButton";
import AddToCartButton from "./addToCartButton";
import DesktopCards from "./ProductCards/desktopCards";
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
  iosfontSizes,
  iospositions,
  fontSizes,
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
  loaderRef,
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

  setSelectedProduct,
  selectedProduct,
  showDetails,
}) => {
  const userId = localStorage.getItem("userId");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); // Function to check screen size
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const maxLength = 20;
  const navigate = useNavigate();

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

  const ViewedProduct = async (productId) => {
    try {
      const response = await fetch(`${api}/viewedProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to log viewed product");
      }

      const result = await response.json();
      alert("Viewed product logged:", result);
    } catch (error) {
      alert("Error:", error.message);
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
      padding: "0px",
      marginTop: "50px",
      margin: "5px",
    },
    Categorycontainer: {
      width: "96%",
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
      padding: "0px",
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

  const mstyles = {
    Mcontainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "0px",
      background: "white",
      maxWidth: "100%", // Prevents full width spread
      margin: "auto", // Centers the whole container
      padding: "0px",
      marginTop: "200px",
    },
    mbox: {
      width: "150px",
      height: "150px",
    },

    mlastBox: {
      background: "blue",

      // Pushes last box to the left
    },
  };

  const handleViewMore = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
    window.location.reload(); // Force a reload to ensure navigation works
  };

  return (
    <>
      {isMobile ? (
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
                  <MobileCard
                    addToWishlist={addToWishlist}
                    Mobject={product}
                    index={index}
                    handleProductClick={handleProductClick}
                    show={show}
                    loaderRef={loaderRef}
                    category={category}
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
                ))}
                <div>
                  <Link
                    to="#"
                    style={styles.viewMoreButton}
                    onClick={() => handleViewMore(category)}
                  >
                    {t("View More")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div ref={loaderRef}> {t("Loading...")}</div>
        </div>
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
                  <div>
                    <DesktopCards
                      addToWishlist={addToWishlist}
                      Dobject={product}
                      index={index}                      
                      loaderRef={loaderRef}
                      category={category}
                      show={show}
                      position={position}
                      Iposition={Iposition}
                      userId={userId}
                      highlightText={highlightText}
                      searchTerm={searchTerm}
                      fontSize={fontSize}
                      IfontSize={IfontSize}
                      showDetails={showDetails}
                      selectedProduct={selectedProduct}
                      handleProductHid={handleProductHid}
                      setSelectedProduct={setSelectedProduct}
                      isExpanded={isExpanded}
                      toggleLike={toggleLike}
                      SelectedProductDesktop={SelectedProductDesktop}
                      maxLength={maxLength}
                      
                    />
                  </div>
                ))}
                <div>
                  <Link
                    to="#"
                    style={styles.viewMoreButton}
                    onClick={() => handleViewMore(category)}
                  >
                    {t("View More")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div ref={loaderRef}> {t("Loading...")}</div>
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
