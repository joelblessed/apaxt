import React, { useState } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
// import { addToCartBeforeLogin } from "../../cartAction";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddToCartButton from "../Cart/addToCartButton";
import WishlistButton from "../wishlist/wishlistButton";
import SelectedProduct from "./selectedProduct";


const SelectedProductDesktop = ({ selectedProduct, handleProductHid , seller, text}) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details"); // Tabs state
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength= 100

  if (!selectedProduct) {
    return <LoadingMessage>Loading product...</LoadingMessage>;

  }


  
  
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <ModalOverlay>
      <ProductContainer>
        {/* Close Button */}
        <CloseButton onClick={handleProductHid}>X</CloseButton>

        {/* Product Image & Details */}
        <ContentWrapper>
          <ImageSection>
            {selectedProduct.thumbnails?.length > 1 ? (
              <Slider {...sliderSettings}>
                {selectedProduct.thumbnails.map((imgUrl, index) => (
                  <ImageWrapper key={index}>
                    <ProductImage src={imgUrl} loading="lazy" alt={`Product Image ${index + 1} `} />
                  </ImageWrapper>
                ))}
              </Slider>
            ) : (
               <ImageWrapper >
                    <ProductImage src={selectedProduct.thumbnails} loading="lazy"/>
                  </ImageWrapper>
              // <NoImage>No images available</NoImage>
            )}
          </ImageSection>

          <DetailsSection>
            <SellerInfo>
              Seller:{" "}
              <SellerLink to={`/productsByOwner/${
                  seller.owner_id
                }/${ seller.owner}`}>
                {
                  seller.owner
                }
              </SellerLink>
            </SellerInfo>

            <ProductName>{selectedProduct.name}</ProductName>
            <ProductPrice>Price: CFA{selectedProduct.price}</ProductPrice>

            {/* Display Rating Above Add to Cart Button */}
            {selectedProduct.rating && <Rating>⭐ {selectedProduct.rating} / 5</Rating>}

            <ButtonGroup>
              <ActionButton >
              <AddToCartButton product={selectedProduct}/>
              </ActionButton>
              <ActionButton secondary>Add To Wishlist<label><WishlistButton product={selectedProduct}/></label></ActionButton>
            </ButtonGroup>
          </DetailsSection>
        </ContentWrapper>

        {/* Tabs for Product Info */}
        <Tabs>
          <Tab active={activeTab === "details"} onClick={() => setActiveTab("details")}>
            Product Details
          </Tab>
          <Tab active={activeTab === "seller"} onClick={() => setActiveTab("seller")}>
            Seller Info
          </Tab>
          <Tab active={activeTab === "description"} onClick={() => setActiveTab("description")}>
            Description
          </Tab>
        </Tabs>

        <TabContent>
          {activeTab === "details" && <p><strong>Stock:</strong> {selectedProduct.stock} available</p>}
          {activeTab === "seller" && <p><strong>Contact:</strong> {
                  seller.phone_number
                }</p>}
          {activeTab === "description" && <div>
            <p>
        {isExpanded ? selectedProduct.description : selectedProduct.description.slice(0, maxLength) + "..."}
      </p>
      {selectedProduct.description.length > maxLength && (
        <button onClick={() => setIsExpanded(!isExpanded)} style={{color:"white", background:"orange", borderRadius:'10px', padding:'5x', fontWeight:"bold"}}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
            </div>}
        </TabContent>
      </ProductContainer>
    </ModalOverlay>
  );
};

export default SelectedProductDesktop;

//
// Styled Components
//
const ModalOverlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
//   background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ProductContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 900px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: red;
  color: white;
  border: none;
  font-size: 18px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: darkred;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  height:auto;
  max-height:800px;


  @media (min-width: 768px) {
    width: 50%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const NoImage = styled.p`
  text-align: center;
  font-size: 14px;
  color: gray;
`;

const DetailsSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const SellerInfo = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SellerLink = styled(Link)`
  color: blue;
  text-decoration: none;
  font-weight: bold;
`;

const ProductName = styled.h1`
  font-size: 24px;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Rating = styled.div`
  font-size: 20px;
  margin: 10px 0;
  color: gold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${(props) => (props.secondary ? "gray" : "orangered")};
  background: ${(props) => (props.secondary ? "none" : "orangered")};
  color: ${(props) => (props.secondary ? "gray" : "white")};
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${(props) => (props.secondary ? "lightgray" : "darkorange")};
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-bottom: 2px solid lightgray;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  background: ${(props) => (props.active ? "orangered" : "none")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "darkorange" : "lightgray")};
  }
`;

const TabContent = styled.div`
  padding: 20px;
  font-size: 16px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: gray;
  padding: 20px;
`;