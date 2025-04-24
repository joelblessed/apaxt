import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const Home = ({brands, categories}) => {
  const boxes = Array.from({ length: 15 }, (_, i) => Box ${i + 1}); // 15 boxes
  const boxesPerPage = 8;
  const catboxesPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);
  const [catstartIndex, setCatStartIndex] = useState(0);
  const navigate = useNavigate();
  
  const handleClick = (box) =>{
    navigate(/brand/${box});
  }

  const nextBoxes = () => {
    if (startIndex + boxesPerPage < boxes.length) {
      setStartIndex(startIndex + boxesPerPage);
    }
  };

  const prevBoxes = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - boxesPerPage);
    }
  };


  const CathandleClick = (category) =>{
    navigate(/category/${category});
  }

  const CatnextBoxes = () => {
    if (catstartIndex + catboxesPerPage < categories.length) {
      setCatStartIndex(catstartIndex + catboxesPerPage);
    }
  };

  const CatprevBoxes = () => {
    if (catstartIndex > 0) {
      setCatStartIndex(catstartIndex - catboxesPerPage);
    }
  };

  return (<>
    <div style={{ textAlign: "center",background:"", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
      
      {/* Hide "Previous" button when at the start */}
      {startIndex > 0 && (
        <button onClick={prevBoxes} style={{ padding: "10px", cursor: "pointer", background:"orange", border:"none" }}>less</button>
      )}

      <div style={{ overflow: "hidden", width: "1300px" ,background:"" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            transform: translateX(-${startIndex * 110}px),
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {brands.map((box, index) => (
            <div key={index} style={{
              width: "150px",
              height: "150px",
              background: "lightblue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              flexShrink: 0,
             
            }}>
              <label style={{fontWeight:"bold", fontSize:"50px", color:"white"}} onClick={()=>{handleClick(box);}}>{box}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Hide "Next" button when at the end */}
      {startIndex + boxesPerPage < boxes.length && (
        <button onClick={nextBoxes} style={{ padding: "10px", cursor: "pointer", background:"orange", border:"none"  }}>more</button>
      )}

    </div>


    {/* category */}
    <div style={{ textAlign: "center",background:"", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
      
      {/* Hide "Previous" button when at the start */}
      {catstartIndex > 0 && (
        <button onClick={CatprevBoxes} style={{ padding: "10px", cursor: "pointer", background:"orange", border:"none" }}>less</button>
      )}

      <div style={{ overflow: "hidden", width: "1300px" ,background:"" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            transform: translateX(-${startIndex * 110}px),
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {categories.map((category, index) => (
            <div key={index} style={{
              width: "150px",
              height: "150px",
              background: "lightblue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              flexShrink: 0,
             
            }}>
              <label style={{fontWeight:"bold", fontSize:"30px", color:"white"}} onClick={()=>{CathandleClick(category);}}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Hide "Next" button when at the end */}
      {catstartIndex + catboxesPerPage < categories.length && (
        <button onClick={CatnextBoxes} style={{ padding: "10px", cursor: "pointer", background:"orange", border:"none"  }}>more</button>
      )}

    </div>
    </>
  );
};

export default Home;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ brands, categories }) => {
  const boxesPerPage = 8;
  const catboxesPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);
  const [catstartIndex, setCatStartIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = (box) => {
    navigate(/brand/${box});
  };

  const nextBoxes = () => {
    if (startIndex + boxesPerPage < brands.length) {
      setStartIndex(startIndex + boxesPerPage);
    }
  };

  const prevBoxes = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - boxesPerPage);
    }
  };

  const CathandleClick = (category) => {
    navigate(/category/${category});
  };

  const CatnextBoxes = () => {
    if…
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import BannerCarousel from "./BannerCarousel";
import SectionHeader from "./SectionHeader";

// Styled components
const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
  margin: 20px 0;
  text-align: center;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #e9ecef;
  }

  h3 {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #333;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const ReviewsCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px 0;
  margin: 20px 0;

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
`;

const ReviewCard = styled.div`
  min-width: 280px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .rating {
    color: #ffc107;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .review-text {
    font-style: italic;
    color: #555;
    margin-bottom: 10px;
  }

  .reviewer-name {
    font-weight: bold;
    color: #333;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const BlogCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .blog-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .blog-content {
    padding: 15px;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #333;
  }

  .blog-excerpt {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
`;

const ReadMoreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = ({ brands, categories, api }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    topSelling: [],
    newArrivals: [],
    limitedOffers: [],
    recommendations: [],
    trending: [],
    reviews: [],
    banners: [],
    blogs: [],
    isLoading: true,
    error: null
  });
  const [lastViewed, setLastViewed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          'top-selling',
          'new-arrivals',
          'limited-offers',
          'recommendations',
          'trending-products',
          'customer-reviews',
          'banners',
          'blogs'
        ];

        const responses = await Promise.all(
          endpoints.map(endpoint => 
            fetch(${api}/${endpoint}).then(res => {…
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();

  // Mock Data
  const mockProducts = [
    { id: 1, name: "Product A", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Product B", image: "https://via.placeholder.com/100" },
    { id: 3, name: "Product C", image: "https://via.placeholder.com/100" },
    { id: 4, name: "Product D", image: "https://via.placeholder.com/100" },
  ];

  const mockCategories = ["Electronics", "Fashion", "Home", "Beauty", "Sports"];
  const mockReviews = [
    { user: "Alice", comment: "Great product!" },
    { user: "Bob", comment: "Fast delivery!" },
  ];
  const mockBanners …
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

export const BannerWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Banner = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  margin: 20px 0;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

export const CategoryBox = styled.div`
  padding: 15px 20px;
  border: 1px solid #ddd;
  cursor: pointer;
  background: #f5f5f5;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background: orange;
    color: white;
  }
`;

export cons…