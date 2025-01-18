// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9]">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-dotted border-[#A0522D] animate-spin"></div>

        {/* Inner Circle with Logo */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#fff] shadow-md">
          <img
            src="/d.gif" // Replace with your logo path
            alt="D'FOOTPRINT Logo"
            className="h-12"
          />
        </div>
      </div>

      {/* Subtext */}
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-[#333]">D&apos;FOOTPRINT</p>
        <p className="text-sm text-[#555] tracking-wider">
          Handmade Elegance, Timeless Style
        </p>
      </div>
    </div>
  );
};

export default Loader;
