import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import styled, { keyframes } from "styled-components";
import "../translations/i18n";

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
} from "./styledComponents";

function MobileCategory({
  api,
  addToCart,
  searchTerm,
  highlightText,
  addToWishList,
  SelectedProduct,
  selectedCategory,
  mobilefilteredProducts,
  filteredProducts,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDProduct, setDSelectedProduct] = useState(null);
  const [selected, setSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showDetails, setShowDetails] = useState(true);
  const username = localStorage.getItem("username");
  const previewRef = useRef(null);
  const buttonRef = useRef(null);
  const { t, i18n } = useTranslation();
  const position = positions[i18n.language] || position.en;
  const fontSize = fontSizes[i18n.language] || fontSize.en;
  const dispatch = useDispatch(); // Function to check screen size

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleProductClic = () => {
    // SelectedProduct(product);
    //  localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  const hanldleProductHid = () => {
    setSelectedProduct(null);
  };

  // Toggle the selection state of a product
  const toggleSelection = (id, currentSelection) => {
    // Update the product on the server using PATCH
    fetch(`${api}/updateProducts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isSelected: !currentSelection }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        // Update the local state to reflect the change
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
      })
      .catch((error) => console.error("Error updating product:", error));
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

  // Toggle like/dislike with one button
  const toggleLike = async (product) => {
    if (!product) return;

    const liked = product.likedBy.some((user) => user.userId === userId);
    const endpoint = liked ? "dislike" : "like";

    const response = await fetch(`${api}/products/${product.id}/${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, username }), // Send user info
    });

    const updatedProduct = await response.json();

    // Update state
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, ...updatedProduct } : p
      )
    );
    setSelectedProduct({ ...product, ...updatedProduct });
  };
  // ////////////////////////////////////////////////////////

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  // ///////////////////////////////////////////////////////////

  const show = (event) => {
    setShowDetails((prevShow) => !prevShow);
    if (previewRef.current && !previewRef.current.contains(event.target)) {
    }
  };

  // useEffect(() => {
  //   // Attach event listener to the whole document
  //   document.addEventListener("mousedown", show);
  //   return () => {
  //     document.removeEventListener("mousedown", show);
  //   };
  // }, []);

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

  const mstyles = {
    Mcontainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      background: "white",
      maxWidth: "100%", // Prevents full width spread
      margin: "auto", // Centers the whole container
      padding: "0px",
      marginTop: "200px",
    },
    mbox: {
      width: "100px",
      height: "150px",
    },

    mlastBox: {
      background: "blue",

      // Pushes last box to the left
    },
  };

  return (
    <>
      <React.Fragment>
        {
          <div style={mstyles.Mcontainer}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div>
                  <BoxContainer
                    className="animated-box"
                    key={index}
                    categoryOption={categoryShadow[product.category]}
                  >
                    <div
                      key={index}
                      style={{
                        ...mstyles.mbox,

                        // justifyContent:
                        // index === filteredProducts.length - 1 ? "space-evenly" : {}, // Apply style only to the last box
                      }}
                    >
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0]} // Display first image only
                          alt={product.name}
                          style={{
                            width: "135px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleProductClic();
                            SelectedProduct(product);

                            show();
                          }}
                        />
                      ) : (
                        <p>{t("No Image Available")}</p>
                      )}
                      <MAddToWishList
                      positiion={position}
                   
                      >
                        +
                      </MAddToWishList>
                    
                    </div>

                    {/* text */}
                    <div style={{ display: "flex" }}>
                      <div
                        className="text"
                        style={{
                          borderRadius: "10PX",
                          width: "100%",
                          height: "100px",
                          // background:"red",
                          padding: "10px",
                        }}
                      >
                        <Name className="name" fontSize="17px">
                          <span
                            style={{ color: "black" }}
                            dangerouslySetInnerHTML={{
                              __html: highlightText(product.name, searchTerm),
                            }}
                          ></span>{" "}
                        </Name>

                        {/* <DescriptionContainer>
                              <DescriptionTitle>
                                {t("Description")}:
                                <DescriptionContent>
                                  {product.description}
                                </DescriptionContent>
                              </DescriptionTitle>
                            </DescriptionContainer> */}
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
                    </div>

                    <div
                      style={{
                        background: "",
                        textAlign: "center",
                        padding: "5px",
                      }}
                    >
                      <MAddtocartButton
                      fontSize={fontSize}
                        main={product.discount > 0}
                        width="auto"
                        onClick={() => dispatch(addToCartAPI(product))}
                      >
                        {t("Add To Cart")}
                      </MAddtocartButton>
                    </div>
                  </BoxContainer>
                </div>
              ))
            ) : (
              <p>{t("Loading...")}</p>
            )}
          </div>
        }

        {/* {product.isSelected ? "Unselect" : "Select"} */}
      </React.Fragment>
    </>
  );
}

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

export default MobileCategory;
