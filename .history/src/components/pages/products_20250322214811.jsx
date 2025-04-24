import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import { addToWishListAPI } from "../../wishlistAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { addToCart, removeFromCart } from "../../cartSlice";
import e from "cors";

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
  font-size: ${({fontSize}) => fontSize || "20px"};
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
  SelectedProduct,
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

  const { t } = useTranslation();
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

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  const hanldleProductHid = () => {
    setSelectedProduct(null);
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
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


 

  return (<>
   {isMobile ? (
     <React.Fragment>
      <div styles={{ diswidth:"100px" , height:"150px", border:"1px solid red"}}>
        <div>

        </div>
        <div>

        </div>
      </div>
     
   </React.Fragment>
   ):(
    <React.Fragment>
    {
      <div className="animated-box" style={styles.container}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div>
              {selectedProduct === product && (
                <div
                  style={{
                    padding: "20px",
                    margin: "0 auto",
                    marginTop: "0px",
                    Width: "40%",
                    maxHeight: "100vh",
                    border: "1px solid green",
                    borderRadius: "20px",
                    // background:'red',
                    boxShadow: "10px 0px 50px 0px pink",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ background: "", width: "400px" }}>
                      {selectedProduct.images &&
                      selectedProduct.images.length > 0 ? (
                        <Slider {...style.sliderSettings}>
                          {selectedProduct.images.map((imgUrl, index) => (
                            <div key={index}>
                              <img
                                src={imgUrl}
                                alt={`${selectedProduct.title} - Image ${
                                  index + 1
                                }`}
                                style={{
                                  width: "400px",
                                  height: "450px",
                                  borderRadius: "8px",
                                }}
                              />
                            </div>
                          ))}
                        </Slider>
                      ) : (
                        <p>No images available</p>
                      )}
                    </div>
                    <div>{SelectedProduct}</div>
                    <div
                      style={{
                        background: "#4ECDC4",
                        width: "500px",
                        marginLeft: "30px",
                      }}
                    >
                      <div style={{ padding: "20px", margin: "0 auto" }}>
                        <CloseButton
                          style={{
                            position: "relative",
                            left: "420px",
                            top: "-40px",
                            background: "none",
                            borderRadius: "0px 14px 10px 10px",
                            width: "80px",
                            border: "1px solid red",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "30px",
                            color: "red",
                          }}
                          onClick={() => hanldleProductHid()}
                        >
                          {t("close")}
                        </CloseButton>
                        <h1>{selectedProduct.name}</h1>
                        <p>{selectedProduct.description}</p>
                        <p>
                          <strong>Price:</strong> {selectedProduct.price}
                        </p>
                      </div>
                      <div style={style.buttonsContainer}>
                        <div>
                          <button
                            style={style.buttons}
                            onClick={() =>
                              dispatch(addToCartBeforeLogin(selectedProduct))
                            }
                          >
                            Add To Cart
                          </button>
                        </div>
                        <div>
                          <button
                            style={{ ...style.buttons }}
                            onClick={() => dispatch(selectedProduct)}
                          >
                            [add To WishList]
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                              styles={{ border: "0px", background: "red" }}
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
                            dispatch(addToCartBeforeLogin(product))
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

export default Products;
