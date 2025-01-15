// components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/path-to-your-banner-image.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover Our Handmade Footwear
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Crafted Just for You – Explore Our Premium Collection
        </p>
        <div className="flex space-x-4">
          <button className="bg-antique-brass text-dark-sapphire py-2 px-6 rounded hover:bg-opacity-90 transition">
            Shop Categories
          </button>
          <button className="border-2 border-antique-brass text-white py-2 px-6 rounded hover:bg-antique-brass hover:text-dark-sapphire transition">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
