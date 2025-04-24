import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../translations/i18n";
import { useTranslation } from "react-i18next";
import {
  BoxContainer,
  AddtocartButton,
  Price,
  Discount,
  DescriptionContainer,
  DescriptionTitle,
  DescriptionContent,
  StatusContainer,
  StatusContent,
  StatusTitle,
  Name,
  categoryShadow,
} from "../styledComponents";

const DesktopCards = ({
  Dobject,
  addToCartAPI,
  addToWishlist,
  show,
  userId,
  highlightText,
  searchTerm,
  
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); // Function to check screen size


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
                            onClick={() =>
                              dispatch(
                                addToWishlist({ productId: product.id, userId })
                              )
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

export default DesktopCards;
