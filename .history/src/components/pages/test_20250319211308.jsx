import React, { useState } from "react";

const CustomDropdown = ({ categories, searchTerm, setSearchTerm, search }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category) => {
    setSearchTerm(category);
    setIsOpen(false);
    search(); // Call search when a category is selected
  };

  return (
    <div style={styles.dropdown}>
      <div 
        style={styles.dropdownHeader} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {searchTerm || "Category"} ▼
      </div>

      {isOpen && (
        <div style={styles.dropdownList}>
          {categories.map((category, index) => (
            <div
              key={index}
              style={styles.dropdownItem}
              onClick={() => handleSelect(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  dropdown: {
    position: "relative",
    width: "200px",
    cursor: "pointer",
  },
  dropdownHeader: {
    padding: "10px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  },
  dropdownList: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: "5px",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
};

export default CustomDropdown;