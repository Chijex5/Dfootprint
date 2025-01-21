import React, { useState, useEffect } from "react";

const HeroShopNowPage = ({ onSectionClick }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [section, setSection] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Enable click for mobile
      } else {
        setIsMobile(false); // Disable click for desktop, enable hover
      }
    };

    checkMobile(); // Check on initial render
    window.addEventListener("resize", checkMobile); // Check when window resizes

    return () => {
      window.removeEventListener("resize", checkMobile); // Clean up listener
    };
  }, []);

  const handleSectionClick = (sectionName) => {
    setSection(sectionName);
    if (onSectionClick) {
      onSectionClick(sectionName); // Notify the parent component if callback is provided
    }
  };

  return (
    <div className="bg-background dark:bg-darkBackground">
      {/* Header */}
      <header className="bg-primary text-white dark:bg-darkPrimary py-8 px-6 md:px-12 mt-[80px]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold">
            Shop Your Way
          </h1>
          {!isMobile && (
            <p className="text-lg md:text-xl font-light mt-4">
              Choose from our curated collection or submit your custom design for replication.
            </p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-12 px-6 md:px-12 space-y-16">
        {/* Option Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Custom Order Option */}
          <div
            onClick={() => handleSectionClick("Custom Design")}
            className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-primary dark:text-white mb-4">
              Custom Design
            </h2>
            <p className="text-secondary dark:text-darkAccent text-base leading-relaxed mb-6">
              Have a design or vision? Upload your reference, and our artisans
              will bring it to life with precision and craftsmanship.
            </p>
            <button className="inline-block bg-primary text-white dark:bg-darkPrimary py-3 px-6 rounded-md shadow hover:bg-opacity-90 transition">
              Upload Design
            </button>
          </div>

          {/* Explore Products Option */}
          <div
            onClick={() => handleSectionClick("Browse Collection")}
            className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-primary dark:text-white mb-4">
              Browse Collection
            </h2>
            <p className="text-secondary dark:text-darkAccent text-base leading-relaxed mb-6">
              Explore our curated range of handcrafted footwear, each crafted
              with care, quality, and timeless style.
            </p>
            <button className="inline-block bg-primary text-white dark:bg-darkPrimary py-3 px-6 rounded-md shadow hover:bg-opacity-90 transition">
              View Products
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute buttom bg-secondary text-white dark:bg-darkSecondary py-6 px-6 md:px-12">
        <div className="text-center">
          <p className="text-sm font-light">
            Experience unmatched craftsmanship. Your dream footwear is just a
            few clicks away.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HeroShopNowPage;
