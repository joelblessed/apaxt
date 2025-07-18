import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaStar, FaClock, FaSearch, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Dummy Data
const categories = [
  { id: 1, name: 'Fantasy', image: 'https://via.placeholder.com/150?text=Fantasy' },
  { id: 2, name: 'Superhero', image: 'https://via.placeholder.com/150?text=Superhero' },
  { id: 3, name: 'Horror', image: 'https://via.placeholder.com/150?text=Horror' },
  { id: 4, name: 'Kids', image: 'https://via.placeholder.com/150?text=Kids' },
  { id: 5, name: 'Animals', image: 'https://via.placeholder.com/150?text=Animals' },
  { id: 6, name: 'Historical', image: 'https://via.placeholder.com/150?text=Historical' },
];

const trendingCostumes = [
  { id: 1, name: 'Wizard Robe', price: 49.99, discount: 39.99, likes: 128, image: 'https://via.placeholder.com/300?text=Wizard+Robe' },
  { id: 2, name: 'Superhero Suit', price: 59.99, discount: 49.99, likes: 95, image: 'https://via.placeholder.com/300?text=Superhero+Suit' },
  { id: 3, name: 'Zombie', price: 34.99, discount: null, likes: 76, image: 'https://via.placeholder.com/300?text=Zombie' },
  { id: 4, name: 'Dragon', price: 69.99, discount: 59.99, likes: 112, image: 'https://via.placeholder.com/300?text=Dragon' },
];

const newArrivals = [
  { id: 5, name: 'Pirate', price: 44.99, discount: null, image: 'https://via.placeholder.com/300?text=Pirate' },
  { id: 6, name: 'Fairy', price: 39.99, discount: 34.99, image: 'https://via.placeholder.com/300?text=Fairy' },
  { id: 7, name: 'Robot', price: 54.99, discount: null, image: 'https://via.placeholder.com/300?text=Robot' },
  { id: 8, name: 'Unicorn', price: 49.99, discount: 44.99, image: 'https://via.placeholder.com/300?text=Unicorn' },
];

const reviews = [
  { id: 1, name: 'Alex Johnson', rating: 5, comment: 'Amazing quality! Got so many compliments at the party.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Sarah Miller', rating: 4, comment: 'Great costume, very comfortable to wear all night.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Jamie Smith', rating: 5, comment: 'Perfect for Halloween! Will definitely buy again.', avatar: 'https://randomuser.me/api/portraits/women/63.jpg' },
];

const heroImages = [
  { id: 1, url: 'https://via.placeholder.com/1200x400?text=Halloween+Sale+50%25+Off', alt: 'Halloween Sale' },
  { id: 2, url: 'https://via.placeholder.com/1200x400?text=New+Arrivals+This+Week', alt: 'New Arrivals' },
  { id: 3, url: 'https://via.placeholder.com/1200x400?text=Superhero+Costumes+Collection', alt: 'Superhero Collection' },
];

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #333;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50%;
    height: 3px;
    background-color: #ff6b6b;
  }
`;

const HeroBannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const HeroNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  ${props => props.left ? 'left: 20px' : 'right: 20px'};

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const HeroDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const HeroDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#ff6b6b' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff6b6b;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const CategoryName = styled.h3`
  padding: 10px;
  text-align: center;
  background: white;
  margin: 0;
  font-size: 1rem;
  color: #333;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  margin: 0 0 5px;
  font-size: 1.1rem;
  color: #333;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const OriginalPrice = styled.span`
  text-decoration: ${props => props.discounted ? 'line-through' : 'none'};
  color: ${props => props.discounted ? '#999' : '#333'};
  font-size: 1rem;
`;

const DiscountPrice = styled.span`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.1rem;
`;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 0.9rem;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

const ReviewAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewerName = styled.h4`
  margin: 0;
  color: #333;
`;

const ReviewStars = styled.div`
  display: flex;
  gap: 3px;
  color: #ffc107;
`;

const ReviewText = styled.p`
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

const CountdownContainer = styled.div`
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CountdownTitle = styled.h3`
  margin-top: 0;
  font-size: 1.5rem;
`;

const CountdownTimer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 15px 0;
`;

const CountdownSegment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountdownValue = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const CountdownLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const SearchContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  max-width: 600px;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #ff6b6b;
  }
`;

const SearchButton = styled.button`
  padding: 0 20px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: #ff5252;
  }
`;

const LastViewedContainer = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const PersonalizedContainer = styled.div`
  background: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

// Component
const CostumeShop = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [lastViewed, setLastViewed] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
      { id: 2, name: 'Superhero Suit', image: 'https://via.placeholder.com/150?text=Superhero+Suit' },
      { id: 5, name: 'Pirate', image: 'https://via.placeholder.com/150?text=Pirate' }
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
    setCurrentHeroIndex(prevIndex => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextHero = () => {
    setCurrentHeroIndex(prevIndex => 
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToHero = (index) => {
    setCurrentHeroIndex(index);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would filter products
    console.log('Searching for:', searchQuery);
  };

  return (
    <Container>
      {/* Hero Banner */}
      <HeroBannerContainer>
        {heroImages.map((image, index) => (
          <HeroImage 
            key={image.id}
            src={image.url}
            alt={image.alt}
            active={index === currentHeroIndex}
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

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search costumes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">
            <FaSearch />
          </SearchButton>
        </SearchContainer>
      </form>

      {/* Shop by Category */}
      <SectionTitle>Shop by Category</SectionTitle>
      <CategoryGrid>
        {categories.map(category => (
          <CategoryCard key={category.id}>
            <CategoryImage src={category.image} alt={category.name} />
            <CategoryName>{category.name}</CategoryName>
          </CategoryCard>
        ))}
      </CategoryGrid>

      {/* Limited Time Offers */}
      <CountdownContainer>
        <CountdownTitle>Limited Time Offer - 30% Off Selected Costumes!</CountdownTitle>
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
        <p>Use code <strong>HALLOWEEN30</strong> at checkout</p>
      </CountdownContainer>

      {/* Trending Costumes */}
      <SectionTitle>Trending Costumes</SectionTitle>
      <ProductGrid>
        {trendingCostumes.map(costume => (
          <ProductCard key={costume.id}>
            <ProductImage src={costume.image} alt={costume.name} />
            <ProductInfo>
              <ProductName>{costume.name}</ProductName>
              <PriceContainer>
                <OriginalPrice discounted={costume.discount !== null}>
                  ${costume.price.toFixed(2)}
                </OriginalPrice>
                {costume.discount && (
                  <DiscountPrice>${costume.discount.toFixed(2)}</DiscountPrice>
                )}
              </PriceContainer>
              <LikesContainer>
                <FaStar color="#ffc107" /> {costume.likes} likes
              </LikesContainer>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>

      {/* New Arrivals */}
      <SectionTitle>New Arrivals</SectionTitle>
      <ProductGrid>
        {newArrivals.map(costume => (
          <ProductCard key={costume.id}>
            <ProductImage src={costume.image} alt={costume.name} />
            <ProductInfo>
              <ProductName>{costume.name}</ProductName>
              <PriceContainer>
                <OriginalPrice discounted={costume.discount !== null}>
                  ${costume.price.toFixed(2)}
                </OriginalPrice>
                {costume.discount && (
                  <DiscountPrice>${costume.discount.toFixed(2)}</DiscountPrice>
                )}
              </PriceContainer>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>

      {/* Customer Reviews */}
      <SectionTitle>Customer Reviews</SectionTitle>
      <ReviewGrid>
        {reviews.map(review => (
          <ReviewCard key={review.id}>
            <ReviewHeader>
              <ReviewAvatar src={review.avatar} alt={review.name} />
              <div>
                <ReviewerName>{review.name}</ReviewerName>
                <ReviewStars>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < review.rating ? "#ffc107" : "#ddd"} />
                  ))}
                </ReviewStars>
              </div>
            </ReviewHeader>
            <ReviewText>{review.comment}</ReviewText>
          </ReviewCard>
        ))}
      </ReviewGrid>

      {/* Last Viewed */}
      {lastViewed.length > 0 && (
        <>
          <SectionTitle>Last Viewed</SectionTitle>
          <LastViewedContainer>
            <ProductGrid>
              {lastViewed.map(item => (
                <ProductCard key={item.id}>
                  <ProductImage src={item.image} alt={item.name} />
                  <ProductInfo>
                    <ProductName>{item.name}</ProductName>
                  </ProductInfo>
                </ProductCard>
              ))}
            </ProductGrid>
          </LastViewedContainer>
        </>
      )}

      {/* Personalized Picks */}
      <SectionTitle>Personalized Picks For You</SectionTitle>
      <PersonalizedContainer>
        <ProductGrid>
          {[...trendingCostumes, ...newArrivals]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map(costume => (
              <ProductCard key={costume.id}>
                <ProductImage src={costume.image} alt={costume.name} />
                <ProductInfo>
                  <ProductName>{costume.name}</ProductName>
                  <PriceContainer>
                    <OriginalPrice discounted={costume.discount !== null}>
                      ${costume.price.toFixed(2)}
                    </OriginalPrice>
                    {costume.discount && (
                      <DiscountPrice>${costume.discount.toFixed(2)}</DiscountPrice>
                    )}
                  </PriceContainer>
                </ProductInfo>
              </ProductCard>
            ))}
        </ProductGrid>
      </PersonalizedContainer>
    </Container>
  );
};

export default CostumeShop;
