import React, { useState } from "react";

const ErrorPage = ({ errorMessage, onRetry, isRetrying }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-darkBackground text-secondary dark:text-darkAccent">
      {/* Error Icon */}
      <div className="text-red-500 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21.25 18.5a9.84 9.84 0 1 1-18.5-9.2 9.84 9.84 0 1 1 18.5 9.2zm-9.25.5a9.84 9.84 0 1 0 9.2-18.5 9.84 9.84 0 1 0-9.2 18.5z"
          />
        </svg>
      </div>

      {/* Error Message */}
      <p className="text-xl sm:text-2xl font-semibold mb-4">
        {errorMessage || "Oops! Something went wrong."}
      </p>

      {/* Retry Button */}
      <button
        onClick={onRetry}
        disabled={isRetrying}
        className={`px-6 py-2 text-lg rounded-lg shadow-md transition ${
          isRetrying
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary dark:bg-darkPrimary text-white hover:bg-secondary dark:hover:bg-darkAccent"
        }`}
      >
        {isRetrying ? "Retrying..." : "Retry"}
      </button>
    </div>
  );
};

export default ErrorPage;
