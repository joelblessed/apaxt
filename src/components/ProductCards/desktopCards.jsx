import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import "../translations/i18n";
import { useTranslation } from "react-i18next";
import WishlistButton from "../wishlist/wishlistButton";
import { api } from "../../config";
import AddToCartButton from "../Cart/addToCartButton";
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
} from "../support/styledComponents";
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
  Seller,
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
  const [selectedSeller, setSelectedSeller] = useState([])
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
      console.log(" DViewed product logged:", result);
    } catch (error) {
      console.log("DError:", error.message);
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
    {Array.isArray(Dobject.user_products) && Dobject.user_products.length > 0 ? (
      Dobject.user_products.map((userp) => (
        <div
          className="animated-box"
          key={userp.id}
          style={{
            ...styles.container,
          }}
        >
          <div style={{ display: "flex" }}>
            {/* Selected Product */}
            {selectedProduct?.id === Dobject.id && selectedSeller?.id === userp.id ? (
              <div>
                <SelectedProductDesktop
                  selectedProduct={selectedProduct}
                  seller={selectedSeller}
                  handleProductHid={handleProductHid}
                />
              </div>
            ) : (
              <BoxContainer
                categoryOption={categoryShadow[userp.category?.main]}
              >
                <div
                  style={{
                    ...styles.box,
                  }}
                >
                  {Dobject.thumbnails.length > 0 ? (
                    <img
                      src={
                        Dobject.thumbnails[Dobject.thumbnail_index || 0] 
                        
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
                        setSelectedSeller(userp);
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
                  <WishlistButton product={userp} />
                </div>

                {/* text */}
                <div style={{ display: "flex", marginTop: "-40px" }}>
                  <div
                    className="text"
                    style={{
                      borderRadius: "10PX",
                      width: "100%",
                      height: "100px",
                      padding: "10px",
                    }}
                  >
                    <Name className="name">
                      {isExpanded ? Dobject.name : Dobject.name.slice(0, 12)}
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
                        <StatusContent>{userp.status}</StatusContent>
                      </StatusTitle>
                    </StatusContainer>
                    <Price>
                      {t("CFA")}: {userp.price - userp.discount}
                    </Price>
                    {userp.discount > 0 && (
                      <Discount>
                        {t("CFA")}:<s>{userp.price}</s>
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
                          {((userp.discount / userp.price) * 100).toFixed(0)}%
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
                  <AddtocartButton main={userp.discount < 1}>
                    <AddToCartButton product={userp} />
                  </AddtocartButton>
                </div>
              </BoxContainer>
            )}
          </div>
          <div ref={loaderRef}> {t()}</div>
        </div>
      ))
    ) : null}
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
