import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTools, FaChair, FaBroom, FaLaptopCode } from 'react-icons/fa';

interface ServicesProps {
  language: 'fr' | 'ar';
}

const Services: React.FC<ServicesProps> = ({ language }) => {
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
  // Icons stay as JSX elements, labels replaced by translation keys
  const services = [
    {
      key: 'Contracting',
      icon: <FaTools className="text-main text-3xl mb-2" />,
    },
    {
      key: 'Fourniture de bureau',
      icon: <FaChair className="text-main text-3xl mb-2" />,
    },
    {
      key: 'Nettoyage',
      icon: <FaBroom className="text-main text-3xl mb-2" />,
    },
    {
      key: 'Solutions informatiques',
      icon: <FaLaptopCode className="text-main text-3xl mb-2" />,
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6 mb-2" dir={dir}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-main mb-10">
          {t('Nos Services')}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map(({ key, icon }, index) => (
            <li
              key={index}
              className="bg-white hover:shadow-xl transition duration-300 shadow-md rounded-xl p-6 flex flex-col items-center text-center"
            >
              {icon}
              <p className="text-lg font-medium">{t(key)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
