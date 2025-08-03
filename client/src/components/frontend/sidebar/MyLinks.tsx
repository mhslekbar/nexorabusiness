import React, { useContext } from "react";
import ButtonElement from "./ButtonElement";
import { ShowFrontEndContext } from "../types";

const MyLink: React.FC = () => {
  const { LegalRegTextRef, HomePageRef, InstructionRef, ComplaintRef }  = useContext(ShowFrontEndContext)

  const scrollToHomePageRef = () => {
    if (HomePageRef?.current) {
      HomePageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToLegalRegText = () => {
    if (LegalRegTextRef?.current) {
      LegalRegTextRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToInstructionRef = () => {
    if (InstructionRef?.current) {
      InstructionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToComplaintRef = () => {
    if (ComplaintRef?.current) {
      ComplaintRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div>
      <ButtonElement 
        img={<img className="w-10 h-10" src="/assets/images/home.png" alt="home" />}
        name="page d'acceuil" 
        onClick={scrollToHomePageRef} />
      <ButtonElement
        img={<img className="w-10 h-10" src="/assets/images/LegalAndRegText.png" alt="LegalAndRegText" />}
        name="Textes juridiques et reglementaires"
        onClick={scrollToLegalRegText}  
      />
      <ButtonElement
        img={<img className="w-10 h-10" src="/assets/images/instruction.png" alt="instruction" />}
        name="INSTRUCTIONS DE L'ONMDM"
        onClick={scrollToInstructionRef}  
      />  
      <ButtonElement
        img={<img className="w-10 h-10" src="/assets/images/complaint.png" alt="complaint" />}
        name="DÉPOSEZ VOTRE PLAINTE"
        onClick={scrollToComplaintRef}  
      />  
    </div>
  );
};

export default MyLink;
