import React, { useState } from "react";
import Image from "next/image";

const ProductImage = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-full h-64">
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      )}

      {/* Image */}
      <img
        src={isError ? "/3.jpeg" : src} // Fallback to placeholder on error
        alt={alt}
        width={640}
        height={480}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          !isLoading ? "group-hover:scale-105" : "opacity-0"
        }`}
        onLoad={() => setIsLoading(false)} // Hide skeleton when loading is complete
        onError={() => {
          setIsError(true); // Show placeholder if an error occurs
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default ProductImage;
