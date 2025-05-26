import React from 'react';

const SearchFilter = ({ searchQuery, setSearchQuery, filters, setFilters }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      <div className="filter-controls">
        <label>
          Price Range: CFA {filters.priceRange[0]} - CFA {filters.priceRange[1]}
          <input
            type="range"
            min="0"
            max="1000000"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({
              ...filters,
              priceRange: [filters.priceRange[0], parseInt(e.target.value)]
            })}
          />
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={filters.number_in_stock}
            onChange={(e) => setFilters({
              ...filters,
              number_in_stock: e.target.checked
            })}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default SearchFilter;