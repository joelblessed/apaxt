import React, { useEffect, useState } from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { addToWishListAPI } from "../../wishlistAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { addToCart, removeFromCart } from "../../cartSlice";

const categoryOptions = {
  1: "0px 0px 10px 1px red",
  2: "0px 0px 10px 1px yellow",
  3: "0px 0px 10px 1px orange",
  4: "0px 0px 10px 1px blue",
  5: "0px 0px 10px 1px black",
  6: "0px 0px 10px 1px violet",
};
const categoryShadow = {
  farm: 1,
  computer: 2,
  Clothing: 3,
  accesseries: 4,
  other: 5,
};

const BoxContainer = styled.div`
  border: px solid red;
  border-radius: 12px;
  box-shadow: ${(props) => categoryOptions[props.categoryOption]};
`;
const AddtocartButton = styled.button`
  background: none;
  border: 1px solid red;
  color: red;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 100%;
  transition: all 0.3s ease;
  width: 90%;
  margin-top: ${(props) => (props.main ? "40px" : "10px")};

  &:hover {
    transform: scale(1.1);
    border: 1px solid green;
    color: green;
  }
`;
const Name = styled.a`
  font-size: 20px;
`;
const DescriptionContainer = styled.label`
  font-size: 10px;
`;
const DescriptionTitle = styled.h6`
  font-size: 13px;
`;
const DescriptionContent = styled.a`
  font-size: 13px;
`;
const Price = styled.h4`
  font-size: 16px;
`;
const Discount = styled.h3`
  font-size: 13px;
`;
const StatusContainer = styled.label`
  font-size: 13px;
`;
const StatusTitle = styled.h6`
  font-size: 13px;
`;
const StatusContent = styled.a`
  font-size: 13px;
`;

const Products = ({
  api,
  loading,
  add,
  images,
  filteredProducts,
  setSelectedProduct,
  addToCart,
  addToWishList,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
  selectedCategory,
  Fortop,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 760);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  // Toggle like/dislike for a product
  const toggleLike = async (productId, currentLikes, currentLiked) => {
    try {
      const updatedLikes = currentLiked ? currentLikes - 1 : currentLikes + 1;
      const updatedLiked = !currentLiked;

      // Update the product on the backend
      const response = await fetch(${api}/products/${productId}, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: updatedLikes, liked: updatedLiked }),
      });

      if (!response.ok) {
        throw new Error("Failed to update likes");
      }

      // Update the local state to reflect the change
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        likes: updatedLikes,
        liked: updatedLiked,
      }));
    } catch (error) {
      console.error("Error updating likes:", error);
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
    },
  };

  return (
    <>
      <div className="animated-box" style={styles.container}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <BoxContainer
              key={index}
              categoryOption={categoryShadow[product.category]}
            >
              <div
                key={index}
                style={{
                  ...styles.box,
                  justifyContent:
                    index === filteredProducts.length - 1 ? "space-evenly" : {},
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
                    }}
                    onClick={() => handleProductClick(product)}
                  />
                ) : (
                  <p>{t("No Image Available")}</p>
                )}
              </div>

              {/* Text */}
              <div style={{ display: "flex" }}>
                <div
                  className="text"
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100px",
                    padding: "10px",
                  }}
                >
                  <Name className="name">
                    <span
                      style={{ color: "black" }}
                      dangerouslySetInnerHTML={{
                        __html: highlightText(product.name, searchTerm),
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
                        -{((product.discount / product.price) * 100).toFixed(0)}
                        %
                      </label>
                    </Discount>
                  )}
                </div>

                {/* Like and Wishlist */}
                <div style={{ background: "white", height: "100px" }}>
                  <div>
                    <button
                      onClick={() =>
                        toggleLike(product.id, product.likes, product.liked)
                      }
                    >
                      {product.liked ? "Dislike 💔" : "Like ❤️"} {product.likes}
                    </button>
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
                      onClick={() => dispatch(addToCartBeforeLogin(product))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{ background: "", textAlign: "center", padding: "5px" }}
              >
                <AddtocartButton
                  main={product.discount > 0}
                  onClick={() => dispatch(addToCartAPI(product))}
                >
                  {t("Add To Cart")}
                </AddtocartButton>
              </div>
            </BoxContainer>
          ))
        ) : (
          <p>{t("Loading...")}</p>
        )}
      </div>
    </>
  );
};

export default Products;