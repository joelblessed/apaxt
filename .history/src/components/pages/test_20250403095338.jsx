import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { fetchProducts } from '../../wishListApi';
import { useWishlist } from '../../us';

const Test = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { user } = useSelector(state => state.auth);
  const { wishlist, toggleWishlistItem, deviceId } = useWishlist(user);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  // Highlight search matches in product names
  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  if (loading) {
    return <LoadingContainer>Loading products...</LoadingContainer>;
  }

  return (
    <ProductsContainer>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          No products found {searchTerm && `matching "${searchTerm}"`}
        </EmptyState>
      ) : (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={wishlist.includes(product.id)}
              onWishlistToggle={() => toggleWishlistItem(product.id)}
              highlightText={highlightText}
              searchTerm={searchTerm}
              deviceId={deviceId}
            />
          ))}
        </ProductsGrid>
      )}
    </ProductsContainer>
  );
};

// Styled Components
const ProductsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  
  input {
    width: 100%;
    max-width: 500px;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
`;

export default Test;