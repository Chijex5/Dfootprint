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
    <div className="fixed bottom-0 left-0 right-0 bg-primary dark:bg-darkAccent p-4 text-white z-50 shadow-md w-[100%]">
      <p className="mb-4">We use cookies to enhance your browsing experience. By continuing to browse, you accept our use of cookies.</p>
      <div className="flex items-center justify-center w-[100%]">
      <button
        onClick={handleAccept}
        className="bg-accent text-white border border-2 px-4 dark:border-darkBackground dark:bg-darkAccent py-2 rounded hover:bg-accent-dark transition-colors"
      >
        Accept
      </button>
      </div>
    </div>
  );
};

export default CookiePopup;
