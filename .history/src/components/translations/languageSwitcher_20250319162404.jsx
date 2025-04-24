import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
const savedLanguage = localStorage.getItem("language")
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change the language
    localStorage.setItem("language",1ng)
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
  
    </div>
  );
}

export default LanguageSwitcher;