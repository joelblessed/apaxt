import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";



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
const CloseButton = styled.button`
&:hover{
transform: scale(1.1);
`;

const BoxContainer = styled.div`
  border: px solid red;
  border-radius: 12px;
  box-shadow: ${(props) => categoryOptions[props.categoryOption]};
`;
const AddtocartButton = styled.button`
background:none;
border: 1px solid RED;
color: red;
padding: 10px 20px;
border-radius: 15px;
cursor: pointer;
font-size: 100%,
transition: all 0.3s ease;
width: 90%;
margin-top:${(props) => (props.main ? "40px" : "10px")};


&:hover{
transform: scale(1.1);
border:1px solid green;
color:green;

}
`;
const MAddtocartButton = styled.button`
background:none;
border: 1px solid RED;
color: red;
padding: 10px 20px;
border-radius: 15px;
cursor: pointer;
font-size: 100%,
transition: all 0.3s ease;
width:auto;
margin-top:${(props) => (props.main ? "5px" : "-60px")};


&:hover{
transform: scale(1.1);
border:1px solid green;
color:green;

}
`;
const Name = styled.a`
  font-size: ${({ fontSize }) => fontSize || "20px"};
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


function Category({
  api,
  addToCart,
  searchTerm,
  highlightText,
  addToWishList,
  SelectedProduct,
  selectedCategory,
  mobilefilteredProducts,
  filteredProducts
}) {
  
  const [isMobile, setIsMobile] = useState()
  const [showDetails, setShowDetails] = useState(true);
   const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct");
  };

 // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 760);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
   {isMobile ? (
      <React.Fragment>
               {
                 <div  style={mstyles.Mcontainer}>
                   { mobilefilteredProducts.length > 0 ? (
                      mobilefilteredProducts.map((product, index) => (
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
                                 }}
                                 onClick={() => {
                                   setSelectedProduct(product);
                                   handleProductClick(product);
                                  //  show();
                                 }}
                               />
                             ) : (
                               <p>{t("No Image Available")}</p>
                             )}
                             <button
                               style={{
                                 position: "relative",
                                 left: "105px",
                                 top: "-15px",
                                 background: "none",
                                 border: "none",
                                 fontSize: "35px",
                                 color: "orange",
                               }}
                             >
                               +
                             </button>
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
   ):(
   ect" : "Select"} */}
   </>
   )}
   </>
  );
}

export default Category;
