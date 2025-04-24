import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Banner, BannerWrapper, CartIconContainer,SearchContainer,SectionTitle, Container,CategoryBox,CategoryWrapper, ProductCard,ProductGrid,ProductImage,ReviewsWrapper,Revca} from "homeStyledComponets";

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
  const mockBanners = [
    { image: "https://via.placeholder.com/600x200", title: "Sale Banner" },
  ];
  const mockBlogs = [
    { id: 1, title: "E-commerce Trends 2025", summary: "Latest updates in e-commerce." },
  ];

  const [lastViewed, setLastViewed] = useState([]);

  useEffect(() => {
    const storedLastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
    setLastViewed(storedLastViewed);
  }, []);

  const handleProductClick = (product) => {
    const updatedLastViewed = [product, ...lastViewed.filter(p => p.id !== product.id)].slice(0, 10);
    localStorage.setItem("lastViewed", JSON.stringify(updatedLastViewed));
    setLastViewed(updatedLastViewed);
    navigate(`/product/${product.id}`);
  };

  return (
    <Container>
      {/* Banners */}
      <BannerWrapper>
        {mockBanners.map((banner, index) => (
          <Banner key={index} src={banner.image} alt={banner.title} />
        ))}
      </BannerWrapper>

      {/* Featured Categories */}
      <SectionTitle>Featured Categories</SectionTitle>
      <CategoryWrapper>
        {mockCategories.map((category, index) => (
          <CategoryBox key={index} onClick={() => navigate(`/category/${category}`)}>
            {category}
          </CategoryBox>
        ))}
      </CategoryWrapper>

      {/* Last Viewed Products */}
      {lastViewed.length > 0 && (
        <>
          <SectionTitle>Last Viewed Products</SectionTitle>
          <ProductGrid>
            {lastViewed.map((product, index) => (
              <ProductCard key={index} onClick={() => handleProductClick(product)}>
                <ProductImage src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </ProductCard>
            ))}
          </ProductGrid>
        </>
      )}

      {/* Top Selling */}
      <SectionTitle>Top Selling</SectionTitle>
      <ProductGrid>
        {mockProducts.map((product, index) => (
          <ProductCard key={index} onClick={() => handleProductClick(product)}>
            <ProductImage src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </ProductCard>
        ))}
      </ProductGrid>

      {/* Customer Reviews */}
      <SectionTitle>Customer Reviews</SectionTitle>
      <ReviewsWrapper>
        {mockReviews.map((review, index) => (
          <ReviewCard key={index}>
            <strong>{review.user}</strong>: {review.comment}
          </ReviewCard>
        ))}
      </ReviewsWrapper>

      {/* Blog Section */}
      <SectionTitle>Latest Blog Posts</SectionTitle>
      <BlogWrapper>
        {mockBlogs.map((blog, index) => (
          <BlogCard key={index}>
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
            <BlogButton onClick={() => navigate(`/blog/${blog.id}`)}>Read More</BlogButton>
          </BlogCard>
        ))}
      </BlogWrapper>
    </Container>
  );
};

export default Home;