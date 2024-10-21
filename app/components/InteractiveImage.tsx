import React, { useState, ReactNode } from "react";

interface Option {
  label?: string;
  icon?: ReactNode;
  options?: Option[];
  onClick?: () => void;
}

interface InteractiveImageProps {
  children?: ReactNode;
  options: Option[];
  showControls?: boolean;
}

function SubMenu({ label, icon, options, onClick }: Option) {
  return (
    <div className="relative group">
      <button
        className="flex items-center justify-start gap-1 p-2 hover:bg-gray-900 rounded-full"
        onClick={onClick}
      >
        {icon} {label}
      </button>
      {options && (
        <div className="absolute right-0 top-full md:right-full md:top-0 hidden group-hover:block bg-gray-800 shadow-lg rounded-lg p-2 z-10">
          {options.map((option: Option, i) => (
            <button
              key={i}
              className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
              onClick={option.onClick}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const InteractiveImage: React.FC<InteractiveImageProps> = ({
  children,
  options,
  showControls = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block w-full max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children && (
        <div
          className={`w-full transition-opacity duration-300 ${
            isHovered ? "opacity-70" : ""
          }`}
        >
          {children}
        </div>
      )}
      <div
        className={`absolute top-2 right-2 bg-gray-800 rounded-lg shadow-lg p-1 text-gray-200 ${
          showControls ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-row md:flex-col space-x-1 md:space-x-0 md:space-y-1">
          {options.map((option: Option, i) => (
            <SubMenu key={i} {...option} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveImage;
