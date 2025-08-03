import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  language: 'fr' | 'ar';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  
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
    <section className="bg-gray-100 text-gray-900 py-20 px-6 text-center" dir={dir}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <img
          src="/assets/nexora-images/fulllogo_transparent.png"
          alt="Nexora Logo"
          className="w-40 mb-8"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {t('Bienvenue chez Nexora Business')}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl">
          {t(
            'Une entreprise moderne et tournée vers l’avenir, spécialisée dans les services professionnels et de confiance.',
          )}
        </p>
      </div>
    </section>
  );
};

export default Hero;
