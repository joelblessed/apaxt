import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import i18n
import {
  Container,
  Section,
  ScrollContainer,
  ScrollWrapper,
  Box,
  NavButton,
} from "./home-styledComponents"; // Import styles

const Home = ({ brands, categories, discounts }) => {
  const { i18n } = useTranslation(); // Get i18n language
  const boxesPerPage = 8;
  const catboxesPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);
  const [catstartIndex, setCatStartIndex] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();

  const handleClick = (brand) => navigate(`/brand/${brand}`);
  const CathandleClick = (category) => navigate(`/category/${category}`);
  const handleDiscounts = () => navigate("/discountedProducts");

  // Function to handle swapping items in an array
  const swapItems = (array, fromIndex, toIndex) => {
    const updatedArray = [...array];
    const temp = updatedArray[fromIndex];
    updatedArray[fromIndex] = updatedArray[toIndex];
    updatedArray[toIndex] = temp;
    return updatedArray;
  };

  // Drag handlers for mobile swap
  const handleDragStart = (index) => setDraggedIndex(index);
  const handleDrop = (index, type) => {
    if (draggedIndex === null) return;
    
    if (type === "brands") {
      const updatedBrands = swapItems(brands, draggedIndex, index);
      setStartIndex(updatedBrands);
    } else if (type === "categories") {
      const updatedCategories = swapItems(categories, draggedIndex, index);
      setCatStartIndex(updatedCategories);
    }

    setDraggedIndex(null);
  };

  return (
    <>
      {/* Discount Banner with Language-Based Image */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <img
          src={i18n.language === "en" 
            ? "/images/A6719EFB-73E6-4D1E-8019-279BAA5DEB6A.png" 
            : "images/discount-en.png"} 
          alt="discount banner"
          style={{ 
            border: "2px solid black", 
            width: "70%", 
            height: "400px", 
            boxShadow: "10px 10px 10px red", 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            background: 'white', 
            cursor: "pointer",
          }} 
          onClick={handleDiscounts}
        />
      </div>

      <Container>
        {/* Category Scrolling */}
        <Section>
          {catstartIndex > 0 && <NavButton onClick={() => setCatStartIndex(catstartIndex - catboxesPerPage)}>◀️</NavButton>}
          <ScrollContainer>
            <ScrollWrapper translateX={catstartIndex * 160}>
              {categories.map((category, index) => (
                <Box 
                  key={index} 
                  onClick={() => CathandleClick(category)}
                  draggable 
                  onDragStart={() => handleDragStart(index)}
                  onDrop={() => handleDrop(index, "categories")}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {category}
                </Box>
              ))}
            </ScrollWrapper>
          </ScrollContainer>
          {catstartIndex + catboxesPerPage < categories.length && (
            <NavButton onClick={() => setCatStartIndex(catstartIndex + catboxesPerPage)}>▶️</NavButton>
          )}
        </Section>

        {/* Brand Scrolling */}
        <h4 style={{ background: "orange", width: "80%", textAlign: "center" }}>Brands</h4>
        <Section>
          {startIndex > 0 && <NavButton onClick={() => setStartIndex(startIndex - boxesPerPage)}>◀️</NavButton>}
          <ScrollContainer>
            <ScrollWrapper translateX={startIndex * 160}>
              {brands.map((brand, index) => (
                <Box 
                  key={index} 
                  onClick={() => handleClick(brand)}
                  draggable 
                  onDragStart={() => handleDragStart(index)}
                  onDrop={() => handleDrop(index, "brands")}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {brand}
                </Box>
              ))}
            </ScrollWrapper>
          </ScrollContainer>
          {startIndex + boxesPerPage < brands.length && (
            <NavButton onClick={() => setStartIndex(startIndex + boxesPerPage)}>▶️</NavButton>
          )}
        </Section>
      </Container>
    </>
  );
};

export default Home;