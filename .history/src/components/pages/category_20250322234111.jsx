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
  setSelectedProduct,
  selectedCategory,
  mobilefilteredProducts,
  filteredProducts
}) {
  
  const [isMobile, setIsMobile] = useState()
  const [showDetails, setShowDetails] = useState(true);
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

   const navigate = useNavigate();
  
    const handleProductClick = (product) => {
      SelectedProduct(product);
      localStorage.setItem("selectedProduct", product);
      navigate("/selectedProduct");
    };
  return (
   <>
   {isMobile ? (
      <React.Fragment>
               {
                 <div className="animated-box" style={mstyles.Mcontainer}>
                   { mobilefilteredProducts.length > 0 ? (
                      mobilefilteredProducts.map((product, index) => (
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
    <>
    <div className="animated-box" style={styles.container}>
   {filteredProducts.length > 0 ? (
     filteredProducts.map((product, index) => (
       
         <div style={{ border:"1px solid purple", borderRadius:"12px", boxShadow:"0px 0px 10px purple"}}>
           <div
             key={index}
             style={{
               ...styles.box,

               justifyContent:
                 index === filteredProducts.length - 1
                   ? "space-evenly"
                   : {}, // Apply style only to the last box
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

                 // onClick={() =>
                 //   toggleSelection(
                 //     product.id,
                 //     product.isSelected,
                 //     navigate("/selectedProduct")
                 //   )
                 // }
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
                 width: "215px",
                 height: "100px",
                 paddingLeft:"10px"
               }}
             >
               <h5 className="name">
                 <span
                   style={{ color: "black" }}
                   dangerouslySetInnerHTML={{
                     __html: highlightText(product.name, searchTerm),
                   }}
                 ></span>{" "}
               </h5>
               <h6>{t("Description")}: {product.desc}</h6>
               <h6>{t("CFA")}: {product.price} </h6>
             </div>

             {/* like and wishlist */}
             <div style={{background:"white", height:"100px"}}>
               <div>
                 <button style={{background:"none", border:"0px"}}>
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="24px"
                     viewBox="0 -960 960 960"
                     width="24px"
                     fill="red"
                   >
                     <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                   </svg>
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
                     width:"35px"
                   }}
                   onClick={() => addToWishList(product)}
                 >
                   +
                 </button>
               </div>
             </div>
           </div>

           <div style={{ background: "", textAlign:'center', padding:"5px"}}>
             <button
               style={{
                 background: "white",
                 border: "1px solid purple",
                 color: "red",
                 padding: "10px 20px",
                 borderRadius: "15px ",
                 cursor: "pointer",
                 fontSize: "100%",
                 transition: "all 0.3s ease",
                 width: "90%",
               }}
               // onClick={() => addToCart(product)}
               onClick={() => dispatch(addToCartBeforeLogin(product))}
             >
               {t("Add To Cart")}
             </button>
           </div>
         </div>
       
     ))
   ) : (
     <p>{t("Loading...")}</p>
   )}
 </div>

 {/* {product.isSelected ? "Unselect" : "Select"} */}
   </>
   )}
   </>
  );
}

export default Category;
