import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import {
  Container,
  Section,
  ScrollContainer,
  ScrollWrapper,
  Box,
  NavButton,
} from "./home-styledComponents"; // Import styles

const Home = ({ brands, categories,discounts }) => {
  const boxesPerPage = 8;
  const catboxesPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);
  const [catstartIndex, setCatStartIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = (brand) => navigate(`/brand/${brand}`);
  const CathandleClick = (category) => navigate(`/category/${category}`);
  const handleDisconts = () => navigate("/discountedProducts")

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
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '', height: 'auto' }}>
  <img style={{ 
    border: "2px solid black", 
    width: "70%", 
    height: "400px", 
    boxShadow: "10px 10px 10px red", 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    background: 'white', 
    cursor:"pointer",
  }} onClick={()=> handleDisconts()}>
    Discounts
  </>
</div>
    <Container>
      {/* Brand Scrolling */}
      <Section>
        {startIndex > 0 && <NavButton onClick={prevBoxes}>◀</NavButton>}
        <ScrollContainer>
          <ScrollWrapper translateX={startIndex * 160}>
            {brands.map((brand, index) => (
              <Box key={index} onClick={() => handleClick(brand)}>
                {brand}
              </Box>
            ))}
          </ScrollWrapper>
        </ScrollContainer>
        {startIndex + boxesPerPage < brands.length && (
          <NavButton onClick={nextBoxes}>▶</NavButton>
        )}
      </Section>

      {/* Category Scrolling */}
      <Section>
        {catstartIndex > 0 && <NavButton onClick={CatprevBoxes}>◀</NavButton>}
        <ScrollContainer>
          <ScrollWrapper translateX={catstartIndex * 160}>
            {categories.map((category, index) => (
              <Box key={index} onClick={() => CathandleClick(category)}>
                {category}
              </Box>
            ))}
          </ScrollWrapper>
        </ScrollContainer>
        {catstartIndex + catboxesPerPage < categories.length && (
          <NavButton onClick={CatnextBoxes}>▶</NavButton>
        )}
      </Section>

    </Container>
    </>
  );
};

export default Home;
