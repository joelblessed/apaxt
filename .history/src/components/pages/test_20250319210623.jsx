import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const categories = ["Technology", "Travel", "Food", "Fitness", "Fashion"];

function Test({ searchTerm, setSearchTerm, search }) {
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSearchTerm(category); // Update the selected category
    setIsOpen(false); // Close the dropdown
    search(); // Trigger the search function
  };

  return (
    <NavLink style={style.NavLink} to="/category">
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Dropdown toggle button */}
        <button
          onClick={toggleDropdown}
          style={{
            ...style.select,
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {searchTerm || "Category"}
          <span style={{ marginLeft: "10px" }}>{isOpen ? "▲" : "▼"}</span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <ul
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
              padding: 0,
              listStyle: "none",
            }}
          >
            <li
              onClick={() => handleCategorySelect("")}
              style={{
                padding: "10px",
                cursor: "pointer",
                color: "#000",
                borderBottom: "1px solid #eee",
              }}
            >
              Category
            </li>
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategorySelect(category)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  color: "#000",
                  borderBottom: "1px solid #eee",
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </NavLink>
  );
}

// Styles
const style = {
  NavLink: {
    color: "red",
    fontSize: "20px",
    textDecoration: "none",
  },
  select: {
    width: "200px",
    color: "red",
    background: "none",
    border: "none",
    fontWeight: "bold",
    fontSize: "20px",
    padding: "10px",
  },
};

export default Test;