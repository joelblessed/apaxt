import styled, { keyframes } from "styled-components";


// Styled Components
export const Container = styled.div`
  max-width: 96%;
  margin: 0 auto;
  padding: 0 15px;
  background: white;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  color: #333;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50%;
    height: 3px;
    background-color: #ff6b6b;
  }
`;

export const HeroBannerContainer = styled.div`
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

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

export const HeroNavButton = styled.button`
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
  z-index: 1;
  ${(props) => (props.left ? "left: 20px" : "right: 20px")};

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const HeroDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 1;
`;

export const HeroDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? "#ff6b6b" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff6b6b;
  }
`;

export const CategoryGrid = styled.div`
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

export const CategoryCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CategoryImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

export const CategoryName = styled.h3`
  padding: 10px;
  text-align: center;
  background: white;
  margin: 0;
  font-size: 1rem;
  color: #333;
  display: flex;
  flex-direction: row;
  border: 1px solid red;
  border-radius: 8px;
`;

export const ProductGrid = styled.div`
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

export const ProductCard = styled.div`
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

export const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const ProductInfo = styled.div`
  padding: 15px;
`;

export const ProductName = styled.h3`
  margin: 0 0 5px;
  font-size: 1.1rem;
  color: #333;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

export const OriginalPrice = styled.span`
  text-decoration: ${(props) => (props.discounted ? "line-through" : "none")};
  color: ${(props) => (props.discounted ? "#999" : "#333")};
  font-size: 1rem;
`;

export const DiscountPrice = styled.span`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 0.9rem;
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ReviewCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

export const ReviewAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ReviewerName = styled.h4`
  margin: 0;
  color: #333;
`;

export const ReviewStars = styled.div`
  display: flex;
  gap: 3px;
  color: #ffc107;
`;

export const ReviewText = styled.p`
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

export const CountdownContainer = styled.div`
  background: linear-gradient(135deg, red, white);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CountdownTitle = styled.h3`
  margin-top: 0;
  font-size: 1.5rem;
`;

export const CountdownTimer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 15px 0;
`;

export const CountdownSegment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CountdownValue = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

export const CountdownLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
`;

export const SearchContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  max-width: 600px;
  width: 100%;
`;

export const SearchInput = styled.input`
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

export const SearchButton = styled.button`
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

export const LastViewedContainer = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const PersonalizedContainer = styled.div`
  background: #f0f8ff;
  padding: 20px;
  border-radius: 8px;

  height: 500px;
`;
