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