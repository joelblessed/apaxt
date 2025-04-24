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

export const ProductGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ProductCard = styled.div`
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 5px;
  &:hover {
    background: #f0f0f0;
  }
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
`;

export const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReviewCard = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const BlogWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

export const BlogCard = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fafafa;
  width: 250px;
`;

export const BlogButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background: orange;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: darkorange;
  }
`;