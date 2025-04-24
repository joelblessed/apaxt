import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const savedLanguage = localStorage.getItem("language" || "en");
  // i18n.changeLanguage(savedLanguage);

  const changeLanguage = (lng, savedLanguage) => {
    i18n.changeLanguage(lsave||ng); // Change the language
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
