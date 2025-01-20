import React, { useState } from "react";
const ImageLoader = ({ src, alt, width = 640, height = 480 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-darkSecondary animate-pulse">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-darkPrimary animate-bounce"></div>
        </div>
      )}

      {/* Image */}
      <img
        src={isError ? "/failed.png" : src} // Fallback on error
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)} // Hide skeleton on load
        onError={() => {
          setIsError(true); // Handle image load error
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default ImageLoader;
