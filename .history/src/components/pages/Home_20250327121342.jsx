
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
            fetch(`${api}/${endpoint}`).then(res => {
              if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
              return res.json();
            })
          )
        );

        setData(prev => ({
          ...prev,
          topSelling: responses[0],
          newArrivals: responses[1],
          limitedOffers: responses[2],
          recommendations: responses[3],
          trending: responses[4],
          reviews: responses[5],
          banners: responses[6],
          blogs: responses[7],
          isLoading: false
        }));

        const storedLastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
        setLastViewed(storedLastViewed);
      } catch (error) {
        setData(prev => ({
          ...prev,
          error: error.message,
          isLoading: false
        }));
      }
    };

    fetchData();
  }, [api]);

  const handleProductClick = (product) => {
    const updatedLastViewed = [product, ...lastViewed.filter(p => p.id !== product.id)].slice(0, 10);
    localStorage.setItem("lastViewed", JSON.stringify(updatedLastViewed));
    navigate(`/product/${product.id}`);
  };

  if (data.isLoading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (data.error) return <ErrorMessage>Error: {data.error}</ErrorMessage>;

  return (
    <HomeContainer>
      <BannerCarousel banners={data.banners} />

      <SectionHeader title="Featured Categories" viewAll={() => navigate('/categories')} />
      <CategoriesGrid>
        {categories.map((category, index) => (
          <CategoryCard 
            key={index} 
            onClick={() => navigate(`/category/${category}`)}
          >
            <div className="category-image">
              {/* Placeholder for category image */}
            </div>
            <h3>{category}</h3>
          </CategoryCard>
        ))}
      </CategoriesGrid>

      {lastViewed.length > 0 && (
        <>
          <SectionHeader title="Continue Shopping" />
          <ProductsGrid>
            {lastViewed.map((product, index) => (
              <ProductCard 
                key={`last-viewed-${index}`}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </ProductsGrid>
        </>
      )}

      <SectionHeader title="Top Selling" viewAll={() => navigate('/products?sort=top-selling')} />
      <ProductsGrid>
        {data.topSelling.map((product, index) => (
          <ProductCard 
            key={`top-selling-${index}`}
            product={product}
            onClick={() => handleProductClick(product)}
            badge="Bestseller"
          />
        ))}
      </ProductsGrid>

      <SectionHeader title="New Arrivals" viewAll={() => navigate('/products?sort=newest')} />
      <ProductsGrid>
        {data.newArrivals.map((product, index) => (
          <ProductCard 
            key={`new-arrival-${index}`}
            product={product}
            onClick={() => handleProductClick(product)}
            badge="New"
          />
        ))}
      </ProductsGrid>

      <SectionHeader title="Limited-Time Offers" />
      <ProductsGrid>
        {data.limitedOffers.map((product, index) => (
          <ProductCard 
            key={`limited-offer-${index}`}
            product={product}
            onClick={() => handleProductClick(product)}
            badge="Sale"
            showDiscount
          />
        ))}
      </ProductsGrid>

      <SectionHeader title="Customer Reviews" />
      <ReviewsCarousel>
        {data.reviews.slice(0, 5).map((review, index) => (
          <ReviewCard key={`review-${index}`}>
            <div className="rating">{'★'.repeat(review.rating)}</div>
            <p className="review-text">"{review.comment}"</p>
            <p className="reviewer-name">— {review.user}</p>
          </ReviewCard>
        ))}
      </ReviewsCarousel>

      <SectionHeader title="Trending Now" />
      <ProductsGrid>
        {data.trending.map((product, index) => (
          <ProductCard 
            key={`trending-${index}`}
            product={product}
            onClick={() => handleProductClick(product)}
            badge="Trending"
          />
        ))}
      </ProductsGrid>

      <SectionHeader title="Latest From Our Blog" viewAll={() => navigate('/blog')} />
      <BlogGrid>
        {data.blogs.slice(0, 3).map((blog, index) => (
          <BlogCard key={`blog-${index}`}>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p className="blog-excerpt">{blog.summary}</p>
              <ReadMoreButton onClick={() => navigate(`/blog/${blog.id}`)}>
                Read More
              </ReadMoreButton>
            </div>
          </BlogCard>
        ))}
      </BlogGrid>
    </HomeContainer>
  );
};

export default Home;



