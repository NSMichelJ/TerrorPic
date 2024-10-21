import React from "react";

function ScaryLoader() {
  return (
    <div className="flex flex-col items-center justify-center text-medium-purple-700">
      <div className="relative w-32 h-32 mb-4">
        <div className="w-32 h-32 border-t-4 border-medium-purple-700 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-16 h-16 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2a9 9 0 0 0-9 9v11l3-3l3 3l3-3l3 3l3-3l3 3V11a9 9 0 0 0-9-9M9 8a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m6 0a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ScaryLoader;
