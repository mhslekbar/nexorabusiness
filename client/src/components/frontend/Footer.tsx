import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCopyright,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface FooterProps {
  language?: "fr" | "ar";
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const { t } = useTranslation();

  // Use language prop or localStorage fallback
  const [lang, setLang] = useState<"fr" | "ar">(
    language ?? (localStorage.getItem("lang") as "fr" | "ar") ?? "fr"
  );

  // Calculate dir based on lang
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Sync lang from localStorage if changed externally
  useEffect(() => {
    const onStorage = () => {
      const storedLang = (localStorage.getItem("lang") as "fr" | "ar") ?? "fr";
      setLang(storedLang);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Sync local language prop changes if any
  useEffect(() => {
    if (language && language !== lang) {
      setLang(language);
    }
  }, [language, lang]);

  const handleEmailClick = () => {
    window.location.href = "mailto:info@nexorabusiness.mr";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+22232010171";
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <footer dir={dir} lang={lang} className="bg-main text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and developer */}
        <div className="md:col-span-2 text-center md:text-left">
          <img
            src="/assets/nexora-images/fulllogo_transparent.png"
            alt={t("Nexora Business Logo")}
            className="w-40 h-40 mx-auto md:mx-0 rounded-full mb-4"
          />
          <div
            className={`flex items-center justify-center md:justify-start text-gray-300 text-sm mt-2 ${
              dir === "rtl" ? "flex-row-reverse" : ""
            }`}
          >
            <FaUser className={`mr-2 ${dir === "rtl" ? "ml-2 mr-0" : ""}`} />
            <p>{t("Développé par Mohamed Salem Lekbar")}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className={`text-center md:text-left ${dir === "rtl" ? "text-right" : ""}`}>
          <h2 className="text-xl font-semibold mb-4">{t("Contactez-nous")}</h2>
          <div
            className={`flex items-center justify-center md:justify-start cursor-pointer hover:underline ${
              dir === "rtl" ? "flex-row-reverse" : ""
            }`}
            onClick={handleEmailClick}
          >
            <FaEnvelope className={`mr-2 ${dir === "rtl" ? "ml-2 mr-0" : ""}`} />
            <span>info@nexorabusiness.mr</span>
          </div>
          <div
            className={`flex items-center justify-center md:justify-start mt-2 cursor-pointer hover:underline ${
              dir === "rtl" ? "flex-row-reverse" : ""
            }`}
            onClick={handlePhoneClick}
          >
            <FaPhone className={`mr-2 ${dir === "rtl" ? "ml-2 mr-0" : ""}`} />
            <span>+222 32010171</span>
          </div>
        </div>

        {/* Social Media */}
        <div className={`text-center md:text-left ${dir === "rtl" ? "text-right" : ""}`}>
          <h2 className="text-xl font-semibold mb-4">{t("Suivez-nous")}</h2>
          <div className="flex justify-center md:justify-start space-x-6 text-xl text-gray-300">
            <div
              className="cursor-pointer hover:text-white"
              onClick={() => openLink("https://facebook.com")}
              aria-label={t("Facebook")}
            >
              <FaFacebook />
            </div>
            <div
              className="cursor-pointer hover:text-white"
              onClick={() => openLink("https://twitter.com")}
              aria-label={t("Twitter")}
            >
              <FaTwitter />
            </div>
            <div
              className="cursor-pointer hover:text-white"
              onClick={() => openLink("https://instagram.com")}
              aria-label={t("Instagram")}
            >
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 text-center text-sm text-gray-400 flex justify-center items-center gap-1">
        <FaCopyright className="text-xs" />
        <span>
          {new Date().getFullYear()} Nexora Business. {t("Tous droits réservés.")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
