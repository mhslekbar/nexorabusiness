import React from "react";

export interface props {
  name: string;
  img?: any,
  onClick?: any
}

const ButtonElement: React.FC<props> = ({ name, img, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`inline-flex gap-2 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-main w-full`} // focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    >
      {img} 
      <span className="ml-2 mt-1">{name.toUpperCase()}</span>
    </div>
  );
};

export default ButtonElement;
