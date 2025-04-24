import React, { useState } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { addToCartBeforeLogin } from "../../cartAction";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SelectedProduct = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details"); // Tabs state

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
    <Container>
      {/* Product Image & Details */}
      <ProductWrapper>
        <ImageContainer>
          {selectedProduct.images?.length > 0 ? (
            <Slider {...sliderSettings}>
              {selectedProduct.images.map((imgUrl, index) => (
                <div key={index}>
                  <ProductImage src={imgUrl} alt={`Product Image ${index + 1}`} />
                </div>
              ))}
            </Slider>
          ) : (
            <NoImage>No images available</NoImage>
          )}
        </ImageContainer>

        <DetailsContainer>
          <SellerLink to={`/productsByOwner/${selectedProduct.owner}`}>
            Seller: {selectedProduct.owner}
          </SellerLink>
          <ProductTitle>{selectedProduct.name}</ProductTitle>
          <ProductPrice>Price: ${selectedProduct.price}</ProductPrice>
          
          {/* Display Rating Above Add to Cart Button */}
          {selectedProduct.rating && (
            <Rating>⭐ {selectedProduct.likes} / 5</Rating>
          )}

          <ButtonsContainer>
            <ActionButton onClick={() => dispatch(addToCartBeforeLogin(selectedProduct))}>
              Add To Cart
            </ActionButton>
            <ActionButton secondary>
              Add To Wishlist
            </ActionButton>
          </ButtonsContainer>
        </DetailsContainer>
      </ProductWrapper>

      {/* Tabs for Details, Seller Info, and Description */}
      <Tabs>
        <TabButton active={activeTab === "details"} onClick={() => setActiveTab("details")}>
          Product Details
        </TabButton>
        <TabButton active={activeTab === "seller"} onClick={() => setActiveTab("seller")}>
          Seller Info
        </TabButton>
        <TabButton active={activeTab === "description"} onClick={() => setActiveTab("description")}>
          Description
        </TabButton>
      </Tabs>

      <TabContent>
        {activeTab === "details" && (
          <p><strong>Stock:</strong> {selectedProduct.stock} available</p>
        )}
        {activeTab === "seller" && (
          <p><strong>Seller Contact:</strong> {selectedProduct.phoneNumber}</p>
        )}
        {activeTab === "description" && (
          <p>{selectedProduct.description}</p>
        )}
      </TabContent>
    </Container>
  );
};

export default SelectedProduct;

//
// Styled Components
//
const Container = styled.div`
  padding: 20px;
  margin: 50px auto;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 50%;
    margin-bottom: 0;
  }
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

const DetailsContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const SellerLink = styled(Link)`
  font-size: 16px;
  color: blue;
  text-decoration: none;
  font-weight: bold;
`;

const ProductTitle = styled.h1`
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

const ButtonsContainer = styled.div`
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

const TabButton = styled.button`
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