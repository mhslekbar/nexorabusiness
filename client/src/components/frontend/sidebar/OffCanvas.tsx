import React from "react";
import MyLinks from "./MyLinks";
import { FaWindowClose } from "react-icons/fa";

export interface InterfaceOfLink {
  title: string;
  path: string;
}

interface OffCanvasInterface {
  isOpen: boolean;
  onClose: any;
}

const Offcanvas: React.FC<OffCanvasInterface> = ({ isOpen, onClose }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"
    : "hidden";
  const offcanvasClasses = isOpen
    ? "fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto transition-transform transform ease-in-out duration-300 translate-x-0 z-10"
    : "hidden";      

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={offcanvasClasses}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Menu bar</h2>
            <FaWindowClose
              className="text-2xl rounded-full text-red-600 hover:bg-gray-200 focus:outline-none focus:ring"
              onClick={onClose}
            />
          </div>
          <MyLinks />
        </div>
      </div>
    </>
  );
};

export default Offcanvas;
