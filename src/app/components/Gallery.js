import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const footwearImages = [
  { src: "/1.jpeg", title: "Luxury Mules" },
  { src: "/2.jpeg", title: "Timeless Slippers" },
  { src: "/3.jpeg", title: "Custom Elegance" },
  { src: "/4.jpeg", title: "Comfort Meets Style" },
];

function ModernGallery() {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setShowLightbox(true);
  };

  return (
    <section
      id="gallery"
      className="relative bg-background py-12 px-4 text-center"
      data-aos="fade-up"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-primary mb-4">
          Your Design, Our Expertise
        </h2>
        <p className="text-lg text-secondary">
          Upload a picture of your desired design, and we’ll replicate it with unmatched craftsmanship. Below are some of our successful replications.
        </p>
      </div>

      {/* Swipe Hint */}
      <p className="text-sm text-gray-600 mb-4">Swipe on mobile or use arrows on desktop to explore our creations.</p>

      {/* Swiper Gallery */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1440: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {footwearImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative group overflow-hidden rounded-lg shadow-lg"
              onClick={() => openLightbox(image)}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">
                  {image.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="custom-prev hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <FaArrowLeft/>
      </button>
      <button
        className="custom-next hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <FaArrowRight/>
      </button>

      {/* Lightbox */}
      {showLightbox && currentImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowLightbox(false)}
        >
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}

      {/* CTA */}
      <div className="mt-12">
        <button className="px-6 py-3 bg-primary text-white text-lg rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300">
          Upload Your Design
        </button>
      </div>
    </section>
  );
}

export default ModernGallery;
