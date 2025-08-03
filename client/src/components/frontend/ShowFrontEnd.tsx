import React, { useEffect, useRef, useState } from "react";
import Offcanvas from "./sidebar/OffCanvas";
import { ShowFrontEndContext } from "./types";
import { useDispatch } from "react-redux";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import ContactForm from "./ContactForm";
import PublicHeader from "../Header/PublicHeader";

const ShowFrontEnd: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const [language, setLanguage] = useState<"fr" | "ar">("fr");

  const dispatch: any = useDispatch();
  const HomePageRef = useRef(null);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Example: await dispatch(getPublicContent());
    };
    fetchData();
  }, [dispatch]);

  return (
    <ShowFrontEndContext.Provider
      value={{ HomePageRef, showImage, setShowImage }}
    >
      {/* <Header toggleOffcanvas={onClose} /> */}
      <PublicHeader
        language={language}
        setLanguage={setLanguage}
      />

      <Offcanvas isOpen={isOpen} onClose={onClose} />
      <div className="container mx-auto p-4" ref={HomePageRef}>
        <Hero language={"fr"} />
        <About language={"fr"} />
        <Services language={"fr"} />
        <ContactForm language={"fr"} />
      </div>
      <Footer />
    </ShowFrontEndContext.Provider>
  );
};

export default ShowFrontEnd;
