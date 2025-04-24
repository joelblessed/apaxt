import React from 'react'

const MobileCard = ({Mo}) => {
  return (
    <React.Fragment>
    {
      <div className="animated-box" style={mstyles.Mcontainer}>
        {Mobject.length > 0 ? (
          Mobject.map((product, index) => (
            <div>
              <BoxContainer
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
                       
                        handleProductClick(product);
                        show();
                      }}
                    />
                  ) : (
                    <p>{t("No Image Available")}</p>
                  )}
                  <MAddToWishList
                    position={position}
                    Iposition={Iposition}
                    onClick={() => dispatch(addToWishlist({ productId: product.id, userId }))}
                  >
                    +
                  </MAddToWishList>
                </div>

                {/* text */}
                <div style={{ display: "flex" }}>
                  <div
                    className="text"
                    style={{
                      borderRadius: "10px",
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
                    IfontSize={IfontSize}
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

        {selectedProduct && showDetails && selectedProduct && <></>}
      </div>
    }

    {/* {product.isSelected ? "Unselect" : "Select"} */}
  </React.Fragment>
  )
}

export default MobileCard
