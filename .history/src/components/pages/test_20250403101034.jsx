import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';

const Test = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Proper useSelector hook
  const auth = useSelector(state => state.auth);
  const wishlist = useSelector(state => state.wishlist);
  
  // Determine which wishlist to use
  const currentWishlist = auth.token ? wishlist.items : wishlist.guestItems;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

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
          No products found {searchTerm && `matching "${searchTerm}"}
        </EmptyState>
      ) : (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={currentWishlist.includes(product.id)}
              onWishlistToggle={() => {}}
              highlightText={highlightText}
              searchTerm={searchTerm}
            />
          ))}
        </ProductsGrid>
      )}
    </ProductsContainer>
  );
};

// ... (styled components remain the same)

export default Test;