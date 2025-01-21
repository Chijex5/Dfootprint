import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import AOS from "aos";
import "swiper/css";
import "swiper/css/navigation";
import "aos/dist/aos.css";

const footwearImages = [
  { src: "/50.jpg", title: "Flats" },
  { src: "/49.jpg", title: "Hermes Slides" },
  { src: "/37.jpg", title: "Half Shoe" },
  { src: "/44.jpg", title: "Blue Flats" },
  { src: "/48.jpg", title: "Inspired by a customer" },
  { src: "/47.jpg", title: "Black Flats" },
  { src: "/36.jpg", title: "More shoes for men" },
  { src: "/35.jpg", title: "For your natives" },
  { src: "/31.jpg", title: "Varieties of green" },
  { src: "/23.jpg", title: "For Palm Lovers" },
  { src: "/27.jpg", title: "Flat sandals" },
  { src: "/15.jpg", title: "Hermes Again" },
  { src: "/16.jpg", title: "Jeans Themed style" },
  { src: "/21.jpg", title: "Black & Red" },
  { src: "/20.jpg", title: "Blue cross" },
  { src: "/39.jpg", title: "brown" },
  { src: "/26.jpg", title: "Weaved Palms" },
  { src: "/40.jpg", title: "Skin Palm" },
  { src: "/3.jpeg", title: "Bally" },
  { src: "/1.jpeg", title: "Betulla" },

];

function ModernGallery() {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Only animate once
    });
  }, []);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setShowLightbox(true);
  };

  return (
    <section
      id="gallery"
      className="relative bg-background dark:bg-darkBackground dark:text-darkAccent py-12 px-4 text-center overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-secondary/40 to-primary/20 blur-2xl z-0 opacity-30 animate-move-gradient"></div>

      {/* Header */}
      <div
        className="max-w-4xl mx-auto mb-8 relative z-10"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <h2 className="text-4xl sm:text-5xl font-playfair dark:text-white font-bold text-primary mb-4">
          Your Design, Our Expertise
        </h2>
        <p className="text-lg text-secondary dark:text-darkAccent">
          Upload a picture of your desired design, and we’ll replicate it with unmatched craftsmanship. Below are some of our successful replications.
        </p>
      </div>

      {/* Swipe Hint */}
      <p
        className="text-sm text-gray-600 mb-4 dark:text-darkPrimary relative z-10"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        Swipe on mobile or use arrows on desktop to explore our creations.
      </p>

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
        className="max-w-6xl mx-auto relative z-10"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {footwearImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative group overflow-hidden rounded-lg shadow-lg"
              onClick={() => openLightbox(image)}
              data-aos="zoom-in"
              data-aos-delay={400 + index * 100} // Stagger animations for each image
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
        className="custom-prev hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary dark:bg-darkSecondary dark:hover:bg-darkAccent text-white p-3 rounded-full shadow-lg hover:bg-secondary transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        data-aos="fade-right"
        data-aos-delay="400"
      >
        <FaArrowLeft />
      </button>
      <button
        className="custom-next hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary dark:bg-darkSecondary dark:hover:bg-darkAccent text-white p-3 rounded-full shadow-lg hover:bg-secondary transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        data-aos="fade-left"
        data-aos-delay="400"
      >
        <FaArrowRight />
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
      <div className="mt-12 relative z-10" data-aos="fade-up" data-aos-delay="500">
        <Link 
          className="px-6 py-3 bg-primary dark:hover:bg-darkAccent text-white text-lg rounded-lg shadow-lg dark:bg-darkSecondary dark:hover:bg-darkSecondary hover:bg-secondary transition-colors duration-300"
          href="/custom"
          >
          Upload Your Design
        </Link>
      </div>
    </section>
  );
}

export default ModernGallery;
