import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AboutProps {
  language: 'fr' | 'ar';  // You may not actually need this prop if you use i18next language switching
}

const About: React.FC<AboutProps> = () => {
  const { t } = useTranslation();
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
    <section className="about max-w-3xl mx-auto px-4 my-10 leading-relaxed" dir={dir}>
      <h2 className="text-main mb-4 font-semibold text-2xl">
        {t('À propos de nous')}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg whitespace-pre-line">
        {t(
          `Nexora Business est une société dynamique qui offre une gamme complète de services incluant le contracting, la fourniture de bureau, le nettoyage, ainsi que des solutions informatiques et digitales innovantes. Nous nous engageons à fournir des services de haute qualité adaptés aux besoins spécifiques de chaque client.`
        )}
      </p>
    </section>
  );
};

export default About;
