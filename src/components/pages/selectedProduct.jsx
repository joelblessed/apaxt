import React, { useState } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
// import { addToCartBeforeLogin } from "../../cartAction";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import AddToCartButton from "./addToCartButton";
import WishlistButton from "./wishlistButton";

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
  
  const [activeTab, setActiveTab] = useState("details"); // Tabs state
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;

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
    <Container style={{marginTop:"150px"}}>
      {/* Product Image & Details */}
      <ProductWrapper>
        <ImageContainer>
          {selectedProduct.images?.length > 0 ? (
            <Slider {...sliderSettings}>
              {selectedProduct.images.map((imgUrl, index) => (
                <div key={index}>
                  <ProductImage
                    src={imgUrl}
                    alt={`Product Image ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <NoImage>No images available</NoImage>
          )}
        </ImageContainer>

        <DetailsContainer>
          <SellerLink  to={`/productsByOwner/${selectedProduct.user_products.map((userp)=>(
                  userp.owner
                ))}`}>
            Seller: {selectedProduct.user_products.map((userp)=>(
                  userp.owner
                ))}
          </SellerLink>
          <ProductTitle>{selectedProduct.name}</ProductTitle>
          <ProductPrice>Price: CFA{selectedProduct.price}</ProductPrice>

          {/* Display Rating Above Add to Cart Button */}
          {selectedProduct.rating && (
            <Rating>⭐ {selectedProduct.likes} / 5</Rating>
          )}

          <ButtonsContainer>
            <ActionButton
              
            >
           <AddToCartButton product={selectedProduct}/>
            </ActionButton>
            <ActionButton secondary>Add To Wishlist<label><WishlistButton product={selectedProduct}/></label></ActionButton>
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
            <strong>Stock:</strong> {selectedProduct.stock} available
          </p>
        )}
        {activeTab === "seller" && (
          <p>
            <strong>Seller Contact:</strong> {selectedProduct.user_products.map((userp)=>(
                  userp.phone_number
                ))}
          </p>
        )}
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
    </Container>
  );
};

export default SelectedProduct;
