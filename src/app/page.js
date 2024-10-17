"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Head from "next/head"; // For SEO and custom fonts
import Image from "next/image"; // Lazy-load images for performance
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; 
import CookiePopup from './components/CookiePopup';
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp, FaSnapchat, FaArrowUp } from 'react-icons/fa'; // Icons for footer

const images = [
  "/1.jpeg",
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/5.jpeg",
  "/6.jpeg",
  "/7.jpeg",
  "/8.jpeg",
  "/9.jpeg",
  "/10.jpeg",
  "/11.jpeg",
];

const createConfetti = () => {
  const footer = document.getElementById('footer'); // Select the footer element

  if (!footer) return; // Check if the footer exists before proceeding

  const confettiCount = 100;
  const colors = ['#295255', '#577877', '#F0F5F7', '#ffffff'];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}%`; // Confetti spreads across the footer's width
    confetti.style.top = `-10px`; // Start confetti from above the footer
    confetti.style.position = 'absolute'; // Set position to absolute within the footer
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    footer.appendChild(confetti);
    console.log("fhfhf")

    // Remove confetti after the animation
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
};




export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0)
  const [email, setEmail] = useState("")
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false); // State for sticky header
  const [isGoUpVisible, setIsGoUpVisible] = useState(false)
  const shopNowRef = useRef(null);
  const goUpRef = useRef(null);
  const [message, setMessage] = useState("")
  const [showSubscribeMessage, setSubscribeShowMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    // Intersection Observer to detect when 'Shop Now' leaves the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderSticky(!entry.isIntersecting); // Toggle sticky header
      },
      { threshold: 0 } // Trigger when the button is fully out of view
    );

    if (shopNowRef.current) {
      observer.observe(shopNowRef.current); // Start observing
    }

    return () => {
      if (shopNowRef.current) {
        observer.unobserve(shopNowRef.current); // Clean up the observer
      }
    };
  }, [shopNowRef]);

  useEffect(() => {
    // Intersection Observer to detect when 'Shop Now' leaves the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGoUpVisible(!entry.isIntersecting); // Toggle sticky header
      },
      { threshold: 0 } // Trigger when the button is fully out of view
    );

    if (goUpRef.current) {
      observer.observe(goUpRef.current); // Start observing
    }

    return () => {
      if (goUpRef.current) {
        observer.unobserve(goUpRef.current); // Clean up the observer
      }
    };
  }, [goUpRef]);

  useEffect(() => {
    createConfetti();
  }, []); // This ensures it runs on the initial render

useEffect(() => {
  AOS.init({
    duration: 1000, // Animation duration
    offset: 200, // Start the animation 200px before reaching the element
    once: true, // Animation happens only once while scrolling down
  });

  // Cleanup on component unmount
  return () => {
    AOS.refresh(); // Refresh AOS to reset its states
  };
}, []);


  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);  // Enable click for mobile
      } else {
        setIsMobile(false); // Disable click for desktop, enable hover
      }
    };

    checkMobile(); // Check on initial render

    window.addEventListener('resize', checkMobile); // Check when window resizes

    return () => {
      window.removeEventListener('resize', checkMobile); // Clean up listener
    };
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide message after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [showMessage]);

  return (
    <div className="box-sizing">
      <Head>
        <meta name="google-site-verification" content="GOI8Rtm1hX9CjSOBeR4BgpVjjp7gF3c4OzPOWRGGdp0" />  
        <meta name="description" content="Luxury sneakers at affordable prices" />
        <meta name="keywords" content="luxury, sneakers, fashion, footwear, D'footprint" />
        <meta property="og:title" content="D&apos;footprint - Luxury at Your Feet" />
        <meta name="keywords" content="luxury, sneakers, fashion, footwear, D&apos;footprint" />
        <meta property="og:image" content="/1.jpeg" /> {/* Add an actual image URL */}
        <meta property="og:url" content="https://yourwebsite.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>D&apos;footprint | Luxury at Your Feet</title>
      </Head>
      
      {/* Hero Section */}
      {isHeaderSticky && (
        <header className={`fixed top-0 left-0 w-full z-50 bg-white shadow-lg transition-all duration-500 ease-in-out transform ${isHeaderSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} bg-opacity-90`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="text-lg font-bold text-primary">D&apos;footprint</div>
            <nav className="flex space-x-4">
              <Link href="/products" className="text-gray-700 hover:text-primary transition-colors transform hover:scale-105 duration-200">Shop Now</Link>
              <Link href="/faq" className="text-gray-700 hover:text-primary transition-colors transform hover:scale-105 duration-200">FAQ</Link>
              <Link href="/track" className="text-gray-700 hover:text-primary transition-colors transform hover:scale-105 duration-200">Track an Order</Link>
            </nav>
          </div>
        </header>
      )}


      <section
        className={`relative h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000`}
        style={{ backgroundImage: `url(${images[currentImage]})` }} // Use the current image
        ref={shopNowRef}
      >
        <div className="absolute inset-0 bg-black opacity-80 transition duration-500 ease-in-out"></div>
        <div className="relative z-10 text-center text-background p-4 md:p-8"> {/* Add padding for mobile */}
          <h1 className="text-4xl md:text-7xl font-bold font-playfair animate-fadeIn"> {/* Adjust font size for mobile */}
            Welcome to D&apos;footprint
          </h1>
          <p className="mt-2 text-lg md:text-xl font-playfair animate-fadeInSlow"> {/* Adjust margin and font size */}
            Perfect Fit, Perfect Price
          </p>
          <Link 
            
            href="/products" 
            className="mt-4 inline-block px-4 py-2 md:px-6 md:py-3 bg-transparent border-2 border-primary text-accent font-semibold rounded-lg shadow-lg hover:bg-primary hover:text-background transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Social Proof Section */}
      <section
        className="h-screen flex flex-col items-center justify-center bg-background text-secondary"
        id='welcome'
      >
        <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-center mb-8 tracking-wide">
            What Our Customers Say
          </h2>
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-8" >
            <div className="p-6 bg-white shadow-xl rounded-lg border border-primary transition-transform duration-300 transform hover:scale-105" data-aos="fade-left">
              <p className="text-lg md:text-xl italic text-center font-light">
              &quot;Best luxury sneakers I&apos;ve ever bought!&quot; - John Doe
              </p>
            </div>
            <div className="p-6 bg-white shadow-xl rounded-lg border border-primary transition-transform duration-300 transform hover:scale-105" data-aos="fade-right">
              <p className="text-lg md:text-xl italic text-center font-light">
              &quot;Amazing fit, amazing price. Highly recommend!&quot; - Jane Smith
              </p>
            </div>
            <div className="p-6 bg-white shadow-xl rounded-lg border border-primary transition-transform duration-300 transform hover:scale-105" data-aos="fade-left">
              <p className="text-lg md:text-xl italic text-center font-light">
              &quot;Top-notch quality, will buy again.&quot; - Michael Lee
              </p>
            </div>
          </div>
        </div>
      </section>
      {isHeaderSticky &&(
        <div
          className="fixed bottom-10 right-10 w-10 h-10 rounded-lg z-50 bg-accent flex cursor-pointer hover:bg-primary items-center justify-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowUp />
        </div>
      )}

      <section className="h-screen flex flex-col items-center justify-center bg-background text-accent px-4 md:px-8">
        <div className="w-full max-w-5xl text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
            Why Choose Us
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
            {/* Selling Point 1 */}
            <div
              className={`relative group transition-transform duration-500 cursor-pointer rounded-lg p-6 bg-white flex items-center justify-center w-40 h-40 md:w-48 md:h-48 ${
                isMobile ? "" : "hover:scale-105 hover:shadow-lg"
              }`}
              data-aos="fade-right" // AOS animation on scroll
              onClick={(e) => {
                if (isMobile) {
                  const element = e.currentTarget.querySelector('.overlay');
                  element.classList.toggle('opacity-100'); // Toggle opacity on mobile
                }
              }}
            >
              <p className="text-center font-semibold">Nationwide Delivery</p>
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 bg-primary bg-opacity-90 rounded-lg p-4 transition-opacity duration-300 overlay ${
                isMobile ? "" : "group-hover:opacity-100"
              }`}>
                <p className="text-white text-sm md:text-base">
                  We provide nationwide delivery, ensuring you get your footwear no matter where you are.
                </p>
              </div>
            </div>

            {/* Selling Point 2 */}
            <div
              className={`relative group transition-transform duration-500 cursor-pointer rounded-lg p-6 bg-white flex items-center justify-center w-40 h-40 md:w-48 md:h-48 ${
                isMobile ? "" : "hover:scale-105 hover:shadow-lg"
              }`}
              data-aos="fade-right"
              onClick={(e) => {
                if (isMobile) {
                  const element = e.currentTarget.querySelector('.overlay');
                  element.classList.toggle('opacity-100');
                }
              }}
            >
              <p className="text-center font-semibold">Custom Footwear</p>
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 bg-primary bg-opacity-90 rounded-lg p-4 transition-opacity duration-300 overlay ${
                isMobile ? "" : "group-hover:opacity-100"
              }`}>
                <p className="text-white text-sm md:text-base">
                  Have a style in mind? We’ll confirm within 3 hours if we can bring your vision to life.
                </p>
              </div>
            </div>

            {/* Selling Point 3 */}
            <div
              className={`relative group transition-transform duration-500 cursor-pointer rounded-lg p-6 bg-white flex items-center justify-center w-40 h-40 md:w-48 md:h-48 ${
                isMobile ? "" : "hover:scale-105 hover:shadow-lg"
              }`}
              data-aos="fade-left"
              onClick={(e) => {
                if (isMobile) {
                  const element = e.currentTarget.querySelector('.overlay');
                  element.classList.toggle('opacity-100');
                }
              }}
            >
              <p className="text-center font-semibold">Affordable Prices</p>
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 bg-primary bg-opacity-90 rounded-lg p-4 transition-opacity duration-300 overlay ${
                isMobile ? "" : "group-hover:opacity-100"
              }`}>
                <p className="text-white text-sm md:text-base">
                  We pride ourselves on being affordable without compromising quality.
                </p>
              </div>
            </div>

            {/* Selling Point 4 */}
            <div
              className={`relative group transition-transform duration-500 cursor-pointer rounded-lg p-6 bg-white flex items-center justify-center w-40 h-40 md:w-48 md:h-48 ${
                isMobile ? "" : "hover:scale-105 hover:shadow-lg"
              }`}
              data-aos="fade-left"
              onClick={(e) => {
                if (isMobile) {
                  const element = e.currentTarget.querySelector('.overlay');
                  element.classList.toggle('opacity-100');
                }
              }}
            >
              <p className="text-center font-semibold">Customer-First Approach</p>
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 bg-primary bg-opacity-90 rounded-lg p-4 transition-opacity duration-300 overlay ${
                isMobile ? "" : "group-hover:opacity-100"
              }`}>
                <p className="text-white text-sm md:text-base">
                  We ensure satisfaction at every step with our customer-first approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Newsletter Signup */}
      <section className="bg-background py-12 flex flex-col items-center justify-center h-screen" ref={goUpRef}>
        <div data-aos="fade-up">
          <div className="text-center w-full max-w-2xl px-4">
            <h2 
              className="text-4xl md:text-5xl font-bold font-playfair text-primary mb-6 transform transition-transform duration-700 ease-in-out"
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              Stay in the Loop
            </h2>
            <p 
              className="text-lg md:text-xl text-secondary mb-8"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              Subscribe to our exclusive newsletter and be the first to know about new arrivals, special offers, and the latest trends.
            </p>
            <form
              className="flex flex-col sm:flex-row justify-center items-center w-full text-primary gap-4 transform transition-all duration-700 ease-in-out"
              data-aos="fade-up" 
              data-aos-delay="300"
              onSubmit={(e) => {
                e.preventDefault();
                setMessage(`Subscribed Successfully with ${email} as email`);
                setSubscribeShowMessage(true);
                setEmail("");
                setTimeout(() => {
                  setSubscribeShowMessage(false); // Hide message after 3 seconds
                }, 3000);
              }}
            >
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-secondary outline-none focus:border-primary focus:ring-primary focus:ring-1 transition-all duration-300"
                data-aos="fade-up" 
                data-aos-delay="400"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-all duration-300 ease-in-out mt-4 sm:mt-0"
                data-aos="fade-up" 
                data-aos-delay="500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {showSubscribeMessage && (
          <div className="fixed top-1 p-4 bg-secondary text-white rounded-lg shadow-lg animate-fade-in subscribe">
            {message}
          </div>
        )}
      </section>



      {/* Footer */}
      <footer className="relative py-12 bg-secondary text-background flex flex-col items-center justify-between h-screen px-4 sm:px-8 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-secondary/40 to-primary/20 blur-2xl z-0 opacity-40 animate-move-gradient"></div>

        {/* Content Section */}
        <div 
          className="relative z-10 w-full max-w-6xl text-center" 
          data-aos="fade-up" 
          data-aos-duration="2000"
          id="footer"
        >
          {/* Social Media Icons */}
          <div className="flex justify-center items-center space-x-8 mb-8" data-aos="zoom-in" data-aos-delay="200">
            {[
              { href: "https://instagram.com", icon: <FaInstagram /> },
              { href: "https://twitter.com", icon: <FaTwitter /> },
              { href: "https://facebook.com", icon: <FaFacebook /> },
              { href: "https://snapchat.com", icon: <FaSnapchat /> },
              { href: "https://whatsapp.com", icon: <FaWhatsapp /> }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group"
                data-aos="fade-down"
                data-aos-delay={300 + index * 100} // Stagger animation
              >
                {React.cloneElement(social.icon, { 
                  className: "text-3xl md:text-4xl transition transform hover:text-primary group-hover:scale-110 duration-300" 
                })}
              </a>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mb-12" data-aos="fade-right" data-aos-delay="400">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <form className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto px-4 py-2 rounded-l-md border-2 border-primary text-secondary focus:outline-none focus:border-accent transition"
              />
              <button className="px-6 py-2 bg-primary text-background rounded-md sm:ml-2 hover:bg-accent transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center items-center space-x-6 mb-8" data-aos="fade-left" data-aos-delay="500">
            <a href="/faq" className="hover:text-primary transition-all">FAQ</a>
            <a href="#" className="hover:text-primary transition-all">Terms of Service</a>
            <a href="/contactus" className="hover:text-primary transition-all">Contact Us</a>
          </div>

          {/* Copyright */}
          <p className="mt-4" data-aos="fade-up" data-aos-delay="600">&copy; 2024 D&apos;footprint. All rights reserved.</p>
        </div>

        {/* Easter Egg Animation */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4 z-0" >
          <div
            className="w-12 h-12 bg-primary rounded-full cursor-pointer easter-egg"
            onClick={() => {
              setClickCount(clickCount + 1);
              setShowMessage(true);
              createConfetti();
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#577877";
              e.currentTarget.style.transform = "scale(1.3) rotate(25deg)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(87, 120, 119, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          ></div>
          {showMessage && (
            <div className="fixed bottom-16 p-4 bg-secondary text-white rounded-lg shadow-lg animate-fade-in">
              {clickCount === 1 
                ? "🎉 Wow, you found the Easter egg! Nice one! Don’t let it get too big-headed!" 
                : clickCount > 1 && clickCount < 5 
                ? "Alright, Sherlock! We know you’ve found the Easter egg—don’t get too carried away now!" 
                : "Whoa there! You’ve clicked the Easter egg a million times! Are you trying to summon it or something?!" 
              }
            </div>
          )}
        </div>



        {/* Additional styling for enhanced effect */}
        <style jsx>{`
          .easter-egg {
            position: relative;
            animation: bounce 2s infinite;
            transition: all 0.5s ease-in-out;
          }

          .easter-egg::before {
            content: '';
            position: absolute;
            width: 24px;
            height: 24px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
            border-radius: 50%;
            top: -8px;
            left: -8px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }

          .confetti {
            position: absolute;
            width: 10px;
            height: 20px;
            opacity: 0.7;
            animation: fall 3s ease-out forwards;
            transform: rotate(45deg);
             z-index: 9999;
          }

          @keyframes fall {
            from {
              top: -10px;
            }
            to {
              top: 100vh;
              opacity: 0;
              transform: rotate(720deg);
            }
          }

          .easter-egg:hover::before {
            opacity: 1;
            animation: glow 1.5s infinite alternate;
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes move-gradient {
            0% {
              transform: translateX(-10%);
            }
            100% {
              transform: translateX(10%);
            }
          }

          @keyframes glow {
            from {
              opacity: 0.5;
            }
            to {
              opacity: 0.9;
            }
          }
        `}</style>
      </footer>
      <CookiePopup />

    </div>
  );
}
