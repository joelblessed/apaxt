import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../translations/i18n";
import { useTranslation } from "react-i18next";
import WishlistButton from "../wishlistButton";
import { api } from "../../../config";
import AddToCartButton from "../addToCartButton";
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
import { viewport } from "@popperjs/core";

const DesktopCards = ({
  Dobject,
  addToCartAPI,
  addToWishlist,
  show,
  userId,
  highlightText,
  searchTerm,
  selectedProduct,
  handleProductHid,
  setSelectedProduct,
  isExpanded,
  toggleLike,
  showDetails,
  SelectedProductDesktop,
  maxLength,
  ts,
  filteredProducts,
  category,
  index,
  loaderRef,
  mBoxWidth,
  mBoxMarginRight,
  imagekey,
  addToCartBeforeLogin,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); // Function to check screen size
  const token = localStorage.getItem("token");
  const imageSelect = localStorage.getItem("imageSelect");
  // const filtered = Dobject.filter(
  //   (product) => category === "All" || product.category === category
  // );

  const ViewedProduct = async (productId) => {
    try {
      const response = await fetch(`${api}/viewedProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to log viewed product");
      }

      const result = await response.json();
      alert(" DViewed product logged:", result);
    } catch (error) {
      alert("DError:", error.message);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "0px",
      background: "",
      maxWidth: "96%", // Prevents full width spread
      margin: "0px", // Centers the whole container
      padding: "0px ",
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
        <div
          className="animated-box"
          style={{
            ...styles.container,
          }}
        >
          {Dobject ? (
            <div style={{ display: "flex" }}>
              {/* selected Product */}
              {selectedProduct === Dobject && (
                <div>
                  <SelectedProductDesktop
                    selectedProduct={selectedProduct}
                    handleProductHid={handleProductHid}
                  />
                </div>
              )}

              {Dobject !== selectedProduct && (
                <BoxContainer
                  key={index}
                  categoryOption={categoryShadow[Dobject.category]}
                >
                  <div
                    key={index}
                    style={{
                      ...styles.box,

                      // justifyContent:
                      // index === filteredProducts.length - 1 ? "space-evenly" : {}, // Apply style only to the last box
                    }}
                  >
                    {(Dobject.thumbnails && Dobject.thumbnails.length > 0) ||
                    (Dobject.images.length > 0 && imageSelect.id) ? (
                      <img
                        src={
                          Dobject.thumbnails && Dobject.thumbnails.length > 0
                            ? Dobject.thumbnails[Dobject.thumbnail_index]
                            : Dobject.images[0]
                        }
                        alt={t("Loading...")}
                        style={{
                          width: "250px",
                          height: "250px",
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          setSelectedProduct(Dobject);
                          ViewedProduct(Dobject.id);
                          show();
                        }}
                      />
                    ) : (
                      <p>{t("No Image Available")}</p>
                    )}
                  </div>
                  <div
                    style={{ position: "relative", top: "0px", left: "212px" }}
                  >
                    <WishlistButton product={Dobject} />
                  </div>

                  {/* text */}
                  <div style={{ display: "flex", marginTop: "-40px" }}>
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
                      { isExpanded 
                          ? Dobject.name
                          : Dobject.name.slice(0, 12)}
                        {/* <span
                          style={{ color: "black" }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(
                              isExpanded
                                ? Dobject.name
                                : Dobject.name.slice(0, 12),
                              searchTerm
                            ),
                          }}
                        ></span>{" "} */}
                      </Name>
                      <DescriptionContainer>
                        <DescriptionTitle>
                          {t("Description")}:
                          <DescriptionContent>
                            {isExpanded
                              ? Dobject.description
                              : Dobject.description.slice(0, maxLength) + "..."}
                          </DescriptionContent>
                        </DescriptionTitle>
                      </DescriptionContainer>
                      <StatusContainer>
                        <StatusTitle>
                          {t("Status")}:
                          <StatusContent>{Dobject.status}</StatusContent>
                        </StatusTitle>
                      </StatusContainer>
                      <Price key={index}>
                        {t("CFA")}: {Dobject.price - Dobject.discount}
                      </Price>
                      {Dobject.discount > 0 && (
                        <Discount key={index}>
                          {t("CFA")}:<s>{Dobject.price}</s>
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
                            {((Dobject.discount / Dobject.price) * 100).toFixed(
                              0
                            )}
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
                  ><AddtocartButton>
                       <AddToCartButton product={Dobject} />
                  </AddtocartButton>
                   
                  </div>
                </BoxContainer>
              )}
            </div>
          ) : (
            <p></p>
          )}
          <div ref={loaderRef}> {t()}</div>

          {selectedProduct && showDetails && selectedProduct && <></>}
        </div>
      }

      {/* {Dobject.isSelected ? "Unselect" : "Select"} */}
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
