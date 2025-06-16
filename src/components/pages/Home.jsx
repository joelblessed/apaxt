import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaClock,
  FaSearch,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import Box from "./boxes";
import Category from "./category";
import {
  CategoryCard,
  CategoryName,
  Container,
  CountdownLabel,
  CountdownSegment,
  CountdownTimer,
  CountdownTitle,
  CountdownValue,
  PriceContainer,
  ProductCard,
  ProductGrid,
  ProductInfo,
  ProductName,
  SectionTitle,
  DiscountPrice,
  ProductImage,
  HeroDot,
  HeroDots,
  HeroBannerContainer,
  HeroNavButton,
  HeroImage,
  CountdownContainer,
  OriginalPrice,
  LastViewedContainer,
  LikesContainer,
  PersonalizedContainer
} from "./HomeStyled";
import SelectedProduct from "./selectedProduct";

// Dummy Data

const heroImages = [
  {
    id: 1,
    url: "public/images/A6719EFB-73E6-4D1E-8019-279BAA5DEB6A.png",
    alt: "Halloween Sale",
  },
  {
    id: 2,
    url: "public/images/laptop.jpg",
    alt: "New Arrivals",
  },
  {
    id: 3,
    url: "public/images/Screenshot From 2025-06-05 15-29-37.png",
    alt: "Superhero Collection",
  },
];

// Component
const Home = ({
  api,
  glofilteredProducts,
  searchTerm,
  setSearchTerm,
  loaderRef,
  highlightText,
  SelectedProduct,
}) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [lastViewed, setLastViewed] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [category, setCategory] = useState([]);
  const [brand, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");

  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcat, setSelectedSubcat] = useState(null);

  const handleBrand = (brand) =>
    navigate(`/categoryPage?categoryName=${brand}`);
  const handleSubCategory = (subcat) =>
    navigate(`/categoryPage?categoryName=${subcat}`);
  const handleCategory = (category) =>
    navigate(`/categoryPage?categoryName=${category}`);

  const handleName = (name) => navigate(`/categoryPage?categoryName=${name}`);

  const handleDiscounts = () => navigate(`/discountedProducts`);
  useEffect(() => {
    if (searchTerm.length > 0) {
      navigate(`/products`);
    }
  });

  useEffect(() => {
    fetch(`${api}/products?limit=10_sort=_id&_order=desc`) // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => {
        const products = data.products; // Extract products from the response

        setProducts(products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const groupedProducts = useMemo(() => {
    const result = {};

    glofilteredProducts.forEach((product) => {
      const category = product.category?.main;
      const subcategory = product.category?.sub;
      const brandName = product.brand?.name;

      if (!category || !subcategory || !brandName) return;

      if (!result[category]) result[category] = {};
      if (!result[category][subcategory]) result[category][subcategory] = {};
      if (!result[category][subcategory][brandName])
        result[category][subcategory][brandName] = [];

      result[category][subcategory][brandName].push(product);
    });

    return result;
  }, [glofilteredProducts]);
  ////

  // Hero banner carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock last viewed items from localStorage
  useEffect(() => {
    const mockLastViewed = [
      {
        id: 2,
        name: "Superhero Suit",
        image: "",
      },
      {
        id: 5,
        name: "Pirate",
        image: "",
      },
    ];
    setLastViewed(mockLastViewed);
  }, []);

  // Countdown timer for limited time offer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = new Date();
      endDate.setDate(now.getDate() + 3); // 3 days from now
      endDate.setHours(23, 59, 59, 0);

      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const goToPrevHero = () => {
    setCurrentHeroIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextHero = () => {
    setCurrentHeroIndex((prevIndex) =>
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToHero = (index) => {
    setCurrentHeroIndex(index);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would filter products
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <Container>
        {/* Hero Banner */}
        {}
        <HeroBannerContainer>
          {heroImages.map((image, index) => (
            <HeroImage
              key={image.id}
              src="/images/A6719EFB-73E6-4D1E-8019-279BAA5DEB6A.png"
              alt={image.alt}
              active={index === currentHeroIndex}
              onClick={() => handleDiscounts}
            />
          ))}
          <HeroNavButton left onClick={goToPrevHero}>
            <FaArrowLeft />
          </HeroNavButton>
          <HeroNavButton onClick={goToNextHero}>
            <FaArrowRight />
          </HeroNavButton>
          <HeroDots>
            {heroImages.map((_, index) => (
              <HeroDot
                key={index}
                active={index === currentHeroIndex}
                onClick={() => goToHero(index)}
              />
            ))}
          </HeroDots>
        </HeroBannerContainer>

        {/* Shop by Category */}
        <SectionTitle>Shop by Category</SectionTitle>
        {/* Categories Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "1rem",
          }}
        >
          {Object.entries(groupedProducts).map(([category]) => (
            <div style={{ display: "flex" }}>
              <CategoryCard
                key={category}
                style={{
                  background:
                    selectedCategory === category ? "#ffe0e0" : "#fff",
                  border:
                    selectedCategory === category
                      ? "2px solid #ff6b6b"
                      : "1px solid #eee",
                  cursor: "pointer",
                  minWidth: "140px",
                  textAlign: "center",
                }}
                onClick={() => {
                  handleCategory(category);
                }}
              >
                {category}
              </CategoryCard>
              <CategoryCard
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSubcat(null);
                }}
              >
                {selectedCategory ? (
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 48 48"
                    fill="red"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h48v48H0z" fill="none" />
                    <g id="Shopicon">
                      <polygon points="6.586,30.586 9.414,33.414 24,18.828 38.586,33.414 41.414,30.586 24,13.172 	" />
                    </g>
                  </svg>
                ) : (
                  <svg
                    width="20px"
                    fill="red"
                    height="20px"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h48v48H0z" fill="none" />
                    <g id="Shopicon">
                      <g>
                        <polygon points="24,29.171 9.414,14.585 6.586,17.413 24,34.827 41.414,17.413 38.586,14.585 		" />
                      </g>
                    </g>
                  </svg>
                )}
              </CategoryCard>
            </div>
          ))}
        </div>

        {/* Subcategories Row */}
        {selectedCategory && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "1rem",
            }}
          >
            {Object.entries(groupedProducts[selectedCategory]).map(
              ([subcat]) => (
                <div style={{ display: "flex" }}>
                  <CategoryCard
                    key={subcat}
                    style={{
                      background:
                        selectedSubcat === subcat ? "#e0f7ff" : "#f7f7f7",
                      border:
                        selectedSubcat === subcat
                          ? "2px solid #2196f3"
                          : "1px solid #eee",
                      cursor: "pointer",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      handleSubCategory(subcat);
                    }}
                  >
                    {subcat}
                  </CategoryCard>
                  <CategoryCard
                    onClick={() => {
                      setSelectedSubcat(subcat);
                    }}
                  >
                    {selectedCategory ? (
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 48 48"
                        fill="red"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h48v48H0z" fill="none" />
                        <g id="Shopicon">
                          <polygon points="6.586,30.586 9.414,33.414 24,18.828 38.586,33.414 41.414,30.586 24,13.172 	" />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        width="20px"
                        fill="red"
                        height="20px"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h48v48H0z" fill="none" />
                        <g id="Shopicon">
                          <g>
                            <polygon points="24,29.171 9.414,14.585 6.586,17.413 24,34.827 41.414,17.413 38.586,14.585 		" />
                          </g>
                        </g>
                      </svg>
                    )}
                  </CategoryCard>
                </div>
              )
            )}
          </div>
        )}

        {/* Brands Full Width */}
        {selectedCategory && selectedSubcat && (
          <div
            style={{
              width: "100%",
              background: "#fffbe7",
              padding: "18px 0",
              margin: "10px 0 24px 0",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {Object.entries(
                groupedProducts[selectedCategory][selectedSubcat]
              ).map(([brand]) => (
                <CategoryName
                  key={brand}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px 16px",
                    background: "#fff",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    borderRadius: "6px",
                  }}
                  onClick={() => handleBrand(brand)}
                >
                  {brand}
                </CategoryName>
              ))}
            </div>
          </div>
        )}

        {/* {Object.entries(groupedProducts).map(([category, subCategories]) => (
          <CategoryGrid>
            <CategoryCard>
              <CategoryImage src={"sgfgf"} alt={"   "} />
              <CategoryName >
              {category}
                
              </CategoryName>
            </CategoryCard>
          </CategoryGrid>
        ))}  */}

        {/* Limited Time Offers */}
        <CountdownContainer>
          <CountdownTitle>
            Limited Time Offer - 30% Off Selected Costumes!
          </CountdownTitle>
          <CountdownTimer>
            <CountdownSegment>
              <CountdownValue>{timeLeft.days}</CountdownValue>
              <CountdownLabel>Days</CountdownLabel>
            </CountdownSegment>
            <CountdownSegment>
              <CountdownValue>{timeLeft.hours}</CountdownValue>
              <CountdownLabel>Hours</CountdownLabel>
            </CountdownSegment>
            <CountdownSegment>
              <CountdownValue>{timeLeft.minutes}</CountdownValue>
              <CountdownLabel>Minutes</CountdownLabel>
            </CountdownSegment>
            <CountdownSegment>
              <CountdownValue>{timeLeft.seconds}</CountdownValue>
              <CountdownLabel>Seconds</CountdownLabel>
            </CountdownSegment>
          </CountdownTimer>
          <p>
            Use code <strong>A30D</strong> at checkout
          </p>
        </CountdownContainer>

        {/* Trending Costumes */}
        <SectionTitle>Trending </SectionTitle>
        <ProductGrid>
           <Box
                 Mobject={products}
                 Dobject={products}
                 loaderRef={loaderRef}
                 SelectedProduct={SelectedProduct}
                 // handleProductClick={handleProductClick}
                 highlightText={highlightText}
                 category={category}
              
               />
        </ProductGrid>

        {/* New Arrivals */}
        <SectionTitle>New Arrivals</SectionTitle>
        <ProductGrid>
            <Box
                 Mobject={products}
                 Dobject={products}
                 loaderRef={loaderRef}
                 SelectedProduct={SelectedProduct}
                 // handleProductClick={handleProductClick}
                 highlightText={highlightText}
                 category={category}
              
               />
        </ProductGrid>

        {/* Customer Reviews */}
        {/* <SectionTitle>Customer Reviews</SectionTitle>
        <ReviewGrid>
          {reviews.map((review) => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <ReviewAvatar src={review.avatar} alt={review.name} />
                <div>
                  <ReviewerName>{review.name}</ReviewerName>
                  <ReviewStars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < review.rating ? "#ffc107" : "#ddd"}
                      />
                    ))}
                  </ReviewStars>
                </div>
              </ReviewHeader>
              <ReviewText>{review.comment}</ReviewText>
            </ReviewCard>
          ))}
        </ReviewGrid> */}

        {/* Last Viewed */}
        {lastViewed.length > 0 && (
          <>
            <SectionTitle>Last Viewed</SectionTitle>
            <LastViewedContainer>
              <ProductGrid>
                {lastViewed.map((item) => (
                  <ProductCard
                    key={item.id}
                    onClick={() => handleName(item.name)}
                  >
                    <ProductImage src={item.image} alt={item.name} />
                    <ProductInfo>
                      <ProductName>{item.name}</ProductName>
                    </ProductInfo>
                  </ProductCard>
                ))}
              </ProductGrid>
            </LastViewedContainer>

            <div></div>
          </>
        )}

      

           <div style={{width:"100%"}}>
        <Category
          searchTerm={searchTerm}
          api={api}
          loaderRef={loaderRef}
          highlightText={highlightText}
          SelectedProduct={SelectedProduct}
        />
      </div>



        {/* Personalized Picks */}
         <SectionTitle>Personalized Picks For You</SectionTitle>
        <PersonalizedContainer>
          <ProductGrid>
            {[...glofilteredProducts]
              .sort(() => 0.5 - Math.random())
              .slice(0, 6)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  onClick={() => handleName(product.name)}
                >
                  <ProductImage
                    src={product.thumbnails[0]}
                    loading="lazy"
                    alt={product.name}
                  />
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    {product.user_products.map((up) => (
                      <PriceContainer>
                        <OriginalPrice discounted={up.discount > 0}>
                          ${up.price.toFixed(2)}
                        </OriginalPrice>
                        {up.discount && (
                          <DiscountPrice>
                            ${up.price - up.discount.toFixed(2)}
                          </DiscountPrice>
                        )}
                      </PriceContainer>
                    ))}
                  </ProductInfo>
                </ProductCard>
              ))}
          </ProductGrid>
        </PersonalizedContainer> 


      </Container>
   
    </>
  );
};

export default Home;
