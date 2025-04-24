import React, { useState } from "react";

const categories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Travel" },
  { id: 3, name: "Food" },
  { id: 4, name: "Fitness" },
  { id: 5, name: "Fashion" },
];

function Test() {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      // Add category if not selected
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div style={{ position: "relative", width: "200px" }}>
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {selectedCategories.length > 0
          ? selectedCategories.join(", ")
          : "Select Categories"}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            marginTop: "5px",
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategorySelect(category.name)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: selectedCategories.includes(category.name)
                  ? "#007bff"
                  : "#fff",
                color: selectedCategories.includes(category.name) ? "#fff" : "#000",
                borderBottom: "1px solid #eee",
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Test;