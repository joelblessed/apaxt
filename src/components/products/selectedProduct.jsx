import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
// import { addToCartBeforeLogin } from "../../cartAction";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import AddToCartButton from "../Cart/addToCartButton";
import WishlistButton from "../wishlist/wishlistButton";

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

const SelectedProduct = ({ selectedProduct ,seller, searchTerm, setSearchTerm }) => {
  const [product, setProduct] = useState(  JSON.parse(localStorage.getItem("selectedProduct")) )
  const [userp, setUserp] = useState( JSON.parse(localStorage.getItem("seller")) )
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("test",product)

  const [activeTab, setActiveTab] = useState("details"); // Tabs state
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;

  useEffect(() => {
    
     window.scrollTo({ top: 0, behavior: "smooth" });
   
  }, [userp]);

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
    <Container style={{ marginTop: "150px" }}>
      {/* Product Image & Details */}

    

          {userp && (
  <>
    <ProductWrapper>
      <ImageContainer>
        {product.thumbnails?.length > 1 ? (
          <Slider {...sliderSettings}>
            {product.thumbnails.map((imgUrl, index) => (
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
            <div>
                <ProductImage
                  src={selectedProduct.thumbnails}
                  
                  loading="lazy"
                />
              </div>
          // <NoImage>No images available</NoImage>
        )}
      </ImageContainer>

      <DetailsContainer>
        <SellerLink to={`/productsByOwner/${
                  seller.owner_id
                }/${ seller.owner}`}>
          Seller: {userp.owner}
        </SellerLink>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>Price: CFA{userp.price}</ProductPrice>

        {/* Display Rating Above Add to Cart Button */}
        {product.rating && (
          <Rating>⭐ {product.likes} / 5</Rating>
        )}

        <ButtonsContainer>
          <ActionButton>
            <AddToCartButton product={product} />
          </ActionButton>
          <ActionButton secondary>
            Add To Wishlist
            <label>
              <WishlistButton product={product} />
            </label>
          </ActionButton>
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
          <strong>Stock:</strong> {userp.number_in_stock} available
        </p>
      )}
      {activeTab === "seller" && (
        <p>
          <strong>Seller Contact:</strong> {userp.phone_number}
        </p>
      )}
      {activeTab === "description" && (
        <div>
          <p>
            {isExpanded
              ? product.description
              : product.description.slice(0, maxLength) + "..."}
          </p>
          {product.description.length > maxLength && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                color: "white",
                background: "orange",
                borderRadius: "10px",
                padding: "5x",
                fontWeight: "bold",
              }}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </TabContent>
  </>
)}
            
        
      
    </Container>
  );
};

export default SelectedProduct;
