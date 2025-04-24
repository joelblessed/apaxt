import React, { useState } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { addToCartBeforeLogin } from "../../cartAction";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Container,
  ProductWrapper,
  ImageContainer,
  ProductImage,
  NoImage,
  DetailsContainer,
  SellerLink,
  ProductTitle,
  ProductPrice,
  Rating,
  ButtonsContainer,
  ActionButton,
  Tabs,
  TabButton,
  TabContent,
  LoadingMessage
} from './selectedProductStyles'

const SelectedProduct = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details"); // Tabs state
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength= 50

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
