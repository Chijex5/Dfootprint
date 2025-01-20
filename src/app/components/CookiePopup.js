// components/CookiePopup.js
'use client'
import { useState, useEffect } from 'react';

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 bg-primary dark:bg-darkAccent p-6 text-white z-50 shadow-lg rounded-lg max-w-[90%] md:max-w-[60%] mx-auto">
  {/* Content Section */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <p className="text-sm md:text-base">
      We use cookies to improve your browsing experience. By continuing, you accept our cookie policy.
    </p>

    {/* Button Section */}
    <div className="flex flex-col md:flex-row items-center gap-2">
      <button
        onClick={handleAccept}
        className="bg-accent dark:bg-darkPrimary text-white px-6 py-2 rounded-lg shadow-md hover:bg-secondary dark:hover:bg-darkSecondary transition-colors text-sm md:text-base"
      >
        Accept
      </button>
      <a
        href="/termsandcondition"
        className="text-accent underline hover:text-secondary dark:text-darkSecondary dark:hover:text-darkBackground text-sm md:text-base"
      >
        Learn More
      </a>
    </div>
  </div>
</div>
  );
};

export default CookiePopup;
