Tmport React, { useState } from "react";

const categories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Travel" },
  { id: 3, name: "Food" },
  { id: 4, name: "Fitness" },
  { id: 5, name: "Fashion" },
];

function Test() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handle category selection
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      // Add category if not selected
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <h2>Select Categories</h2>
      <div>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryToggle(category.name)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedCategories.includes(category.name)
                ? "#007bff"
                : "#f0f0f0",
              color: selectedCategories.includes(category.name) ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div>
        <h3>Selected Categories:</h3>
        {selectedCategories.length > 0 ? (
          <ul>
            {selectedCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        ) : (
          <p>No categories selected.</p>
        )}
      </div>
    </div>
  );
}

export default Test;