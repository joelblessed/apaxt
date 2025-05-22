import React, { useState } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
// import { addToCartBeforeLogin } from "../../cartAction";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams, Link } from "react-router-dom";

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
  LoadingMessage,
} from "./selectedProductStyles";

const SelectedProduct = ({ selectedProduct, searchTerm, setSearchTerm }) => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const [product, setProduct] = useState(selectedProduct)
  const [activeTab, setActiveTab] = useState("details"); // Tabs state
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;

  if (!product) {
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
    <Container style={{marginTop:"150px"}}>
      {/* Product Image & Details */}
      <ProductWrapper>
        <ImageContainer>
          {product.images?.length > 0 ? (
            <Slider {...sliderSettings}>
              {product.images.map((imgUrl, index) => (
                <div key={index}>
                  <ProductImage
                    src={imgUrl}
                    alt={`Product Image ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <NoImage>No images available</NoImage>
          )}
        </ImageContainer>

        <DetailsContainer>
          <SellerLink to={`/productsByOwner/${product.owner}`}>
            Seller: {product.owner}
          </SellerLink>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductPrice>Price: ${product.price}</ProductPrice>

          {/* Display Rating Above Add to Cart Button */}
          {product.rating && (
            <Rating>⭐ {product.likes} / 5</Rating>
          )}

          <ButtonsContainer>
            <ActionButton
              
            >
              Add To Cart
            </ActionButton>
            <ActionButton secondary>Add To Wishlist</ActionButton>
          </ButtonsContainer>
        </DetailsContainer>
      </ProductWrapper>

      {/* Tabs for Details, Seller Info, and Description */}
      <Tabs>
        <TabButton
          active={activeTab === "details"}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </TabButton>
        <TabButton
          active={activeTab === "seller"}
          onClick={() => setActiveTab("seller")}
        >
          Seller Info
        </TabButton>
        <TabButton
          active={activeTab === "description"}
          onClick={() => setActiveTab("description")}
        >
          Description
        </TabButton>
      </Tabs>

      <TabContent>
        {activeTab === "details" && (
          <p>
            <strong>Stock:</strong> {product.stock} available
          </p>
        )}
        {activeTab === "seller" && (
          <p>
            <strong>Seller Contact:</strong> {product.phoneNumber}
          </p>
        )}
        {activeTab === "description" && <div>
            <p>
        {isExpanded ? product.description : product.description.slice(0, maxLength) + "..."}
      </p>
      {product.description.length > maxLength && (
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
            </div>}
      </TabContent>
    </Container>
  );
};

export default SelectedProduct;
