import React from 'react';
import { useRouter } from 'next/navigation';

const InvoiceDownloaded = () => {
    const router = useRouter();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-darkBackground dark:to-darkSecondary">
      <div className="bg-white dark:bg-darkSecondary rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center items-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7M9 19h6a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Invoice Downloaded!
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your invoice has been downloaded successfully. Thank you for your purchase!
        </p>
        
        {/* Action Button */}
        <button
          onClick={() => router.push("/products")}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default InvoiceDownloaded;
