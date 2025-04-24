import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const savedLanguage = localStorage.getItem("language") || "en";
  i18n.changeLanguage(savedLanguage);

  const changeLanguage = (lng,) => {
    i18n.changeLanguage(lng); // Change the language
    localStorage.setItem("language", lng);
  };

  return (
    <div>
      
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
    </div>
  );
}

export default LanguageSwitcher;
