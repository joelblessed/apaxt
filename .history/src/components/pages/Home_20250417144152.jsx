import { useState,useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import i18n
import {
  Container,
  Section,
  ScrollContainer,
  ScrollWrapper,
  Box,
  NavButton,
  ImageaContainer,
  Image,
} from "./home-styledComponents"; // Import styles
import CategoryBox from "./categoryBox"; // Import CategoryBox component

const Home = ({
  brands,
  categories,
  glofilteredProducts,
  SelectedProduct,
  highlightText,
  loaderRef,
  discounts,
  api,
}) => {
  const { i18n } = useTranslation(); // Get i18n language
  const boxesPerPage = 2;
  const catboxesPerPage = 2;
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [catstartIndex, setCatStartIndex] = useState(0);
  const [viewed, setViewed] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

 

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
      setStartIndex(0); // Reset startIndex for brands
      // Update brands state if needed (e.g., via a parent prop or context)
    } else if (type === "categories") {
      const updatedCategories = swapItems(categories, draggedIndex, index);
      setCatStartIndex(0); // Reset catstartIndex for categories
      // Update categories state if needed (e.g., via a parent prop or context)
    }

    setDraggedIndex(null);
  };

  const handleProductClick = useCallback(
    (product) => {
      SelectedProduct(product);
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      navigate("/selectedProduct");
    },
    [SelectedProduct, navigate]
  );

  const fetchViewedProducts = async (userId) => {
    try {
      const response = await fetch(`${api}/viewedProducts/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch viewed products');
      }
      const data = await response.json();
      console.log('Viewed products:', data);
      return data;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };



  useEffect(() => {
    const getData = async () => {
      const data = await fetchViewedProducts(userId);
      const VP = data.map((viewed) => viewed.productId);

      const filtered = glofilteredProducts.filter((product) =>
        VP.includes(product.id)
      
      );
      console.log("viewed", filtered);

      setViewed(filtered);
    };
    getData();
  }, [userId]);


  const groupByCategory = useCallback((products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  }, []);

  const groupByBrand = useCallback((products) => {
    return products.reduce((acc, product) => {
      product.brand.forEach((brand) => {
        if (!acc[brand.name]) acc[brand.name] = [];
        acc[brand.name].push(product);
      });
      return acc;
    }, {});
  }, []);

  const groupedProducts = useMemo(
    () => groupByCategory(glofilteredProducts),
    [glofilteredProducts, groupByCategory, groupByBrand]
  );

  const groupedBrand = useMemo(
    () => groupByBrand(glofilteredProducts),
    [glofilteredProducts, groupByCategory, groupByBrand]
  );
  const Dobject = useMemo(
    () => Object.keys(groupedProducts),
    [groupedProducts]
  );

  const bDobject = useMemo(() => Object.keys(groupedBrand), [groupedBrand]);
  const Dobject1 = useMemo(() => {
    return Dobject.reduce((acc, category) => {
      acc[category] = groupedProducts[category].slice(0, 4);
      return acc;
    }, {});
  }, [Dobject, groupedProducts]);

  const bDobject1 = useMemo(() => {
    return bDobject.reduce((acc, brand) => {
      acc[brand] = groupedBrand[brand].slice(0, 4);
      return acc;
    }, {});
  }, [bDobject, groupedBrand]);

  const groupedBrandsByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = [
        ...new Set(
          glofilteredProducts
            .filter((product) => product.category === category)
            .map((product) => product.brand)
            .flat()
        ),
      ];
      return acc;
    }, {});
  }, [categories, glofilteredProducts]);

  return (
    <>
      {/* Discount Banner with Language-Based Image */}

      <h3>Recently Viewed</h3>
      <ul>
        {viewed.map((item) => (
          <li key={item.id}>Product ID: {item.name}</li>
        ))}
      </ul>
      <ImageaContainer>
     

        <Image
          src={
            i18n.language === "en"
              ? "/images/A6719EFB-73E6-4D1E-8019-279BAA5DEB6A.png"
              : "images/discount-en.png"
          }
          alt="discount banner"
          onClick={handleDiscounts}
        />
      </ImageaContainer>

      <Container>
        {/* Category Scrolling */}
        <h4 style={{ background: "orange", width: "80%", textAlign: "center" }}>
          Categories
        </h4>
        <Section>
          {catstartIndex > 0 && (
            <NavButton
              onClick={() => setCatStartIndex(catstartIndex - catboxesPerPage)}
            >
              ◀️
            </NavButton>
          )}
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
                  {/* <ul>
                    {groupedBrandsByCategory[category]?.map((brand, idx) => (
                      <li key={idx} onClick={() => handleClick(brand)}>
                        {brand.name}
                      </li>
                    ))}
                  </ul> */}
                </Box>
              ))}
            </ScrollWrapper>
          </ScrollContainer>
          {catstartIndex + catboxesPerPage < categories.length && (
            <NavButton
              onClick={() => setCatStartIndex(catstartIndex + catboxesPerPage)}
            >
              ▶️
            </NavButton>
          )}
        </Section>

        <div>
          <CategoryBox
            Mobject={products}
            Dobject={Dobject}
            Dobject1={Dobject1}
            loaderRef={loaderRef}
            SelectedProduct={SelectedProduct}
            handleProductClick={handleProductClick}
            highlightText={highlightText}
          />
        </div>

        {/* Brand Scrolling */}
        <h4 style={{ background: "orange", width: "80%", textAlign: "center" }}>
          Brands
        </h4>
        <Section>
          {startIndex > 0 && (
            <NavButton onClick={() => setStartIndex(startIndex - boxesPerPage)}>
              ◀️
            </NavButton>
          )}
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
            <NavButton onClick={() => setStartIndex(startIndex + boxesPerPage)}>
              ▶️
            </NavButton>
          )}
        </Section>

        <div>
          <CategoryBox
            Mobject={products}
            Dobject={bDobject}
            Dobject1={bDobject1}
            loaderRef={loaderRef}
            SelectedProduct={SelectedProduct}
            handleProductClick={handleProductClick}
            highlightText={highlightText}
          />
        </div>
      </Container>
    </>
  );
};

export default Home;
