import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import styles
import {
  Container,
  Section,
  ScrollContainer,
  ScrollWrapper,
  NavButton,
  ImageaContainer,
  Image,
  Box as Boxx,
} from "./home-styledComponents";
import CategoryBox from "./categoryBox";
import Box from "./boxes";

// Create Web Workers for heavy computations
const createGroupingWorker = () => {
  if (window.Worker) {
    return new Worker(new URL('./homeWorker.js', import.meta.url));
  }
  return null;
};

const Home = ({
  brands,
  categories,
  glofilteredProducts,
  SelectedProduct,
  highlightText,
  loaderRef,
  discounts,
  searchTerm,
  api,
}) => {
  const { i18n } = useTranslation();
  const boxesPerPage = 2;
  const catboxesPerPage = 2;
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [catstartIndex, setCatStartIndex] = useState(0);
  const [viewed, setViewed] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Create workers
  const groupingWorker = useMemo(() => createGroupingWorker(), []);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [groupedBrand, setGroupedBrand] = useState({});

  const handleClick = (brand) => navigate(`/categoryPage?categoryName=${brand}`);
  const CathandleClick = (category) => navigate(`/categoryPage?categoryName=${category}`);
  const handleDiscounts = () => navigate(`/discountedProducts`);
  useEffect(()=>{
    if (searchTerm.length >0){
      navigate(`/products`);

    }
  })

  const swapItems = (array, fromIndex, toIndex) => {
    const updatedArray = [...array];
    const temp = updatedArray[fromIndex];
    updatedArray[fromIndex] = updatedArray[toIndex];
    updatedArray[toIndex] = temp;
    return updatedArray;
  };

  const handleDragStart = (index) => setDraggedIndex(index);
  const handleDrop = (index, type) => {
    if (draggedIndex === null || draggedIndex === index) return;

    if (type === "brands") {
      const updatedBrands = swapItems(brands, draggedIndex, index);
      console.log("Updated brands:", updatedBrands);
      setStartIndex(0);
    } else if (type === "categories") {
      const updatedCategories = swapItems(categories, draggedIndex, index);
      console.log("Updated categories:", updatedCategories);
      setCatStartIndex(0);
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

  // Fetch viewed products with error handling
  useEffect(() => {
    if (!userId || glofilteredProducts.length === 0) return;

    const fetchViewedProducts = async () => {
      try {
        const response = await fetch(`${api}/viewedProducts/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch viewed products');

        const data = await response.json();
        const viewedIds = data.map(item => item.productId);
        const filtered = glofilteredProducts.filter(product => 
          viewedIds.includes(product.id)
        );
        setViewed(filtered);
      } catch (error) {
        console.error('Error:', error.message);
        setViewed([]);
      }
    };

    fetchViewedProducts();
  }, [glofilteredProducts, userId, api, token]);

  // Set up worker for product grouping
  useEffect(() => {
    if (!groupingWorker) return;

    const handleWorkerMessage = (event) => {
      const { type, result } = event.data;
      if (type === 'groupByCategory') {
        setGroupedProducts(result);
      } else if (type === 'groupByBrand') {
        setGroupedBrand(result);
      }
    };

    groupingWorker.addEventListener('message', handleWorkerMessage);

    return () => {
      groupingWorker.removeEventListener('message', handleWorkerMessage);
    };
  }, [groupingWorker]);

  // Process data in worker when glofilteredProducts changes
  useEffect(() => {
    if (!groupingWorker || !glofilteredProducts.length) return;

    groupingWorker.postMessage({
      type: 'groupByCategory',
      products: glofilteredProducts
    });

    groupingWorker.postMessage({
      type: 'groupByBrand',
      products: glofilteredProducts
    });
  }, [glofilteredProducts, groupingWorker]);

  // Memoized derived data
  const Dobject = useMemo(() => Object.keys(groupedProducts), [groupedProducts]);
  const bDobject = useMemo(() => Object.keys(groupedBrand), [groupedBrand]);

  const Dobject1 = useMemo(() => {
    return Dobject.reduce((acc, category) => {
      acc[category] = (groupedProducts[category] || []).slice(0, 4);
      return acc;
    }, {});
  }, [Dobject, groupedProducts]);

  const bDobject1 = useMemo(() => {
    return bDobject.reduce((acc, brand) => {
      acc[brand] = (groupedBrand[brand] || []).slice(0, 4);
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

  // Clean up worker on unmount
  useEffect(() => {
    return () => {
      if (groupingWorker) {
        groupingWorker.terminate();
      }
    };
  }, [groupingWorker]);

  return (
    <>
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
                <Boxx
                  key={index}
                  onClick={() => CathandleClick(category)}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDrop={() => handleDrop(index, "categories")}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {category}
                </Boxx>
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

        {viewed.length > 0 && (
          <div>
            <h3 style={{ textAlign: "center" }}> Viewed Products</h3>
            <Box
              Mobject={viewed}
              Dobject={viewed}
              highlightText={highlightText}
            />
          </div>
        )}

        <div>
          <CategoryBox
            Mobject={products || []}
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
              {bDobject.map((brand, index) => (
                <Boxx
                  key={index}
                  onClick={() => handleClick(brand)}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDrop={() => handleDrop(index, "brands")}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {brand}
                </Boxx>
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