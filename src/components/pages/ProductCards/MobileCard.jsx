import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../translations/i18n";
import { useTranslation } from "react-i18next";
import WishlistButton from "../wishlistButton";
import AddToCartButton from "../addToCartButton";

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
} from "../styledComponents";

const MobileCard = ({
  Mobject,
  addToCartAPI,
  addToWishlist,
  handleProductClick,
  show,
  position,
  Iposition,
  index,
  userId,
  highlightText,
  searchTerm,
  fontSize,
  IfontSize,
  maxLength,

  loaderRef,
  isExpanded,
  showDetails,
  handleWishlistToggle,
  isInWishlist,

  category,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); // Function to check screen size

  const mstyles = {
    Mcontainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "0px",
      background: "",
      maxWidth: "100%", // Prevents full width spread
      margin: "0px 0px", // Centers the whole container
      padding: "0px",
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

  return (
    <React.Fragment>
      <div className="animated-box" style={{ ...mstyles.Mcontainer }}>
        {Mobject ? (
          <div>
            <BoxContainer
              key={index}
              categoryOption={categoryShadow[Mobject.category]}
            >
              <div
                key={index}
                style={{
                  ...mstyles.mbox,

                  // justifyContent:
                  // index === filteredProducts.length - 1 ? "space-evenly" : {}, // Apply style only to the last box
                }}
              >
                {(Mobject.thumbnails && Mobject.thumbnails.length > 0) ||
                Mobject.images.length > 0 ? (
                  <img
                    src={
                      Mobject.thumbnails && Mobject.thumbnails.length > 0
                        ? Mobject.thumbnails[Mobject.thumbnail_index]
                        : Mobject.images[0]
                    }
                    alt={t("Loading...")}
                    style={{
                      width: "150px",
                      height: "160px",
                      borderRadius: "10px",
                    }}
                    onClick={() => {
                      handleProductClick(Mobject);
                    }}
                  />
                ) : (
                  <p>{t("No Image Available")}</p>
                )}
                <MAddToWishList position={position} Iposition={Iposition}>
                  <WishlistButton product={Mobject} />
                </MAddToWishList>
              </div>

              {/* text */}
              <div style={{ display: "flex" }}>
                <div
                  className="text"
                  style={{
                    borderRadius: "10px",
                    marginTop: "15px",
                    width: "95%",
                    height: "100px",
                    padding: "0px",
                    // background:"green",
                    marginLeft: "auto",
                  }}
                >
                  <Name className="name" fontSize="17px">
                    <span
                      style={{ color: "black" }}
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          isExpanded ? Mobject.name : Mobject.name.slice(0, 12),
                          searchTerm
                        ),
                      }}
                    ></span>{" "}
                  </Name>

                  {/* <DescriptionContainer>
                   <DescriptionTitle>
                     {t("Description")}:
                     <DescriptionContent>
                       {Mobject.description}
                     </DescriptionContent>
                   </DescriptionTitle>
                 </DescriptionContainer> */}
                  <StatusContainer>
                    <StatusTitle>
                      {t("Status")}:
                      <StatusContent>{Mobject.status}</StatusContent>
                    </StatusTitle>
                  </StatusContainer>
                  <Price key={index}>
                    {t("CFA")}: {Mobject.price - Mobject.discount}
                  </Price>
                  {Mobject.discount > 0 && (
                    <Discount key={index}>
                      {t("CFA")}:<s>{Mobject.price}</s>
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
                        -{((Mobject.discount / Mobject.price) * 100).toFixed(0)}
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
                <MAddtocartButton>
                  <AddToCartButton product={Mobject} />
                </MAddtocartButton>
              </div>
            </BoxContainer>
          </div>
        ) : (
          <p></p>
        )}
        <div ref={loaderRef}> {t()}</div>
      </div>
    </React.Fragment>
  );
};

export default MobileCard;
