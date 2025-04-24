mport React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const savedLanguage = localStorage.getItem("language") || "en";
  i18n.changeLanguage(savedLanguage);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change the language
    localStorage.setItem("language", lng);
  };

  return (
    <div>
      <h1>{t("home")}</h1>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
    </div>
  );
}

export default LanguageSwitcher;
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  // Load saved language from localStorage or default to "en"
  const savedLanguage = localStorage.getItem("language") || "en";

  // Set the language on component mount
  useEffect(() => {
    i18n.changeLanguage(savedLanguage);
  }, [savedLanguage, i18n]);

  // Function to handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change the language
    localStorage.setItem("language", lng); // Save the selected language
  };

  return (
    <div>
      <h1>{t("home")}</h1>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
    </div>
  );
}

export default LanguageSwitcher;
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === "en");

  // Load saved language from localStorage or default to "en"
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
    setIsEnglish(savedLanguage === "en");
  }, [i18n]);

  // Function to toggle between English and French
  const toggleLanguage = () => {
    const newLanguage = isEnglish ? "fr" : "en";
    i18n.changeLanguage(newLanguage); // Change the language
    localStorage.setItem("language", newLanguage); // Save the selected language
    setIsEnglish(!isEnglish); // Update the toggle state
  };

  return (
    <button onClick={toggleLanguage}>
      {t("toggle_language")} {/* Display the toggle button text */}
    </button>
  );
}

export default LanguageToggle;
import React, { useState } from "react";

const categories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Travel" },
  { id: 3, name: "Food" },
  { id: 4, name: "Fitness" },
  { id: 5, name: "Fashion" },
];

function () {
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

export default ;