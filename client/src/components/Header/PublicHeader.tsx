import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PublicHeaderProps {
  language?: "fr" | "ar";
  setLanguage: (lang: "fr" | "ar") => void;
}

const PublicHeader: React.FC<PublicHeaderProps> = ({
  language,
  setLanguage,
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // Sync language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as "fr" | "ar" | null;
    if (savedLang && savedLang !== language) {
      i18n.changeLanguage(savedLang);
      setLanguage(savedLang);
    }
  }, [i18n, language, setLanguage]);

  // Update language and localStorage
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as "fr" | "ar";
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  // Set direction according to current language
  const [dir, setDir] = useState<"ltr" | "rtl">(
    language === "ar" ? "rtl" : "ltr"
  );

  // Whenever language changes, update dir
  useEffect(() => {
    setDir(language === "ar" ? "rtl" : "ltr");
    localStorage.setItem("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  // Navigate to login page on icon click
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header
      className="bg-main text-white p-4 flex justify-between items-center flex-wrap shadow"
      dir={dir}
    >
      {/* Logo */}
      <img
        src="/assets/nexora-images/fulllogo_transparent.png"
        alt="Nexora Logo"
        className="h-14 md:h-16"
        style={{ cursor: "pointer" }}
      />

      {/* Navigation controls */}
      <nav className="flex items-center space-x-3 mt-3 md:mt-0">
        <div className="relative inline-block w-36">
          <select
            className="
              appearance-none
              w-full
              p-2
              pl-3
              pr-8
              rounded
              border
              border-gray-300
              bg-white
              text-main
              font-semibold
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-second
              transition
              duration-300
              cursor-pointer
            "
            value={language}
            onChange={handleLanguageChange}
            aria-label="Select language"
          >
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
          {/* Custom arrow icon */}
          <div
            className={`
              pointer-events-none
              absolute
              top-1/2
              -translate-y-1/2
              text-second
              select-none
              text-lg
              ${dir === "rtl" ? "left-3" : "right-3"}
            `}
          >
            ▼
          </div>
        </div>

        {/* LOGIN ICON BUTTON */}
        <button
          onClick={handleLoginClick}
          className="p-2 rounded-full bg-white text-main hover:bg-second hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-second"
          aria-label={language === "ar" ? "تسجيل الدخول" : "Login"}
          title={language === "ar" ? "تسجيل الدخول" : "Login"}
        >
          <FaSignInAlt size={20} />
        </button>
      </nav>
    </header>
  );
};

export default PublicHeader;
