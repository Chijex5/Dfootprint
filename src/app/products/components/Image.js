import React, { useState } from "react";
import Image from "next/image";

const ProductImage = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const convertDriveLink = (url) => {
    if (!url) return null;
    const fileId = url.split("id=")[1];
    return fileId
      ? `https://drive.google.com/uc?export=download&id=${fileId}`
      : null;
  };
  
  // Example Usage

  const convertedUrl = convertDriveLink(src); // Output: https://drive.google.com/uc?export=download&id=1potVLLoPs136QJTfxnVZTh_QzbzhAPV1
  

  return (
    <div className="relative w-full h-64">
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      )}

      {/* Image */}
      <Image
        src={isError ? "/default-placeholder.png" : convertedUrl} // Fallback to placeholder on error
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
