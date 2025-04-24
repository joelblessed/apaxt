import React, { useState, useEffect } from "react";

const Test = ({ selectedCategory, setSelectedCategory, api }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(5); // Number of items per page

  // Fetch products from db.json
  useEffect(() => {
    fetch(`${api}/products`)
      .then((response) => response.json())
      .then((data) => {
        const productsData = data.products || data;
        setProducts(productsData);
        setFilteredProducts(productsData);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle search filtering
  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();

    let filtered = products.filter((product) => {
      const categoryMatch = product.category.toLowerCase().includes(query);
      const productNameMatch = product.name.toLowerCase().includes(query);
      const brandMatch = product.brand.some((b) =>
        b.name.toLowerCase().includes(query)
      );

      return categoryMatch || productNameMatch || brandMatch;
    });

    // Apply category filter if a category is selected
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ padding: "20px",  marginTop:"60px"}}>
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, category, or brand..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "300px", marginRight: "10px", padding: "8px" }}
      />
      <button onClick={handleSearch} style={{ padding: "8px 12px" }}>
        Search
      </button>

      {/* Display Filtered Products */}
      <div>
        {currentItems.length === 0 ? (
          <p>No products found.</p>
        ) : (
          currentItems.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  width: "100px",
                  height: "100px",
                  marginRight: "20px",
                  objectFit: "cover",
                }}
              />
              <div>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand.map((b) => b.name).join(", ")}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({
          length: Math.ceil(filteredProducts.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === index + 1 ? "#007bff" : "#ddd",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Test