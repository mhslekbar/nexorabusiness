import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ContactFormProps {
  language: "fr" | "ar";
}

const ContactForm: React.FC<ContactFormProps> = ({ language }) => {
  const { t } = useTranslation()
  const [dir, setDir] = useState(localStorage.getItem("dir") ?? "ltr");

  useEffect(() => {
    const handleStorageChange = () => {
      const newDir = localStorage.getItem("dir") ?? "ltr";
      setDir(newDir);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  return (
    <section
      className="contact-form py-10 px-6 max-w-xl mx-auto bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md"
      dir={dir}
    >
      <h2 className="text-main mb-6 text-center text-2xl font-semibold">
        {t("Contactez-nous")}
      </h2>
      <form className="flex flex-col space-y-4">
        <label>
          <input
            type="text"
            placeholder={t("Votre nom")}
            className="w-full p-3 rounded border border-gray-300 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-main"
            required
          />
        </label>
        <label>
          <input
            type="email"
            placeholder={t("Votre email")}
            className="w-full p-3 rounded border border-gray-300 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-main"
            required
          />
        </label>
        <label>
          <textarea
            placeholder={t("Votre message")}
            className="w-full p-3 rounded border border-gray-300 h-32 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-main"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-main text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {t("Envoyer")}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
