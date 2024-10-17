import React from 'react';
import Image from 'next/image';

const ImageOverlayPopup = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full p-4 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition"
        >
          &times;
        </button>
        <Image
          src={imageUrl}
          alt="Popup Preview"
          className="w-full h-auto rounded-lg object-cover"
          width={600}
          height={400}
        />
      </div>
    </div>
  );
};

export default ImageOverlayPopup;
