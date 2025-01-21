import React, { useState } from "react";
import MessageModal from "@/app/components/MessageComponent";

const SizeSelector = ({
  selectedSizes,
  onSizeChange,
  selectedFit,
  onFitChange,
  disabledSizes = [],
}) => {
  const sizeRanges = {
    "36-40": [36, 37, 38, 39, 40],
    "41-56": [41, 42, 43, 44, 45, 46],
  };

  const fits = ["Small", "Normal", "Big"];

  const [message, setMessage] = useState(null);

  const handleSizeClick = (size) => {
    if (disabledSizes.includes(size)) {
      setMessage({
        type: "info",
        text: `Size ${size} is unavailable for this product. Please check similar products for your size.`,
      });
      return;
    }

    // Toggle size selection
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    onSizeChange(updatedSizes);
  };

  return (
    <div>
      {message && (
        <MessageModal
          messageType={message.type}
          messageText={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      {/* Size Range Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-primary dark:text-darkAccent">
          Select Sizes
        </label>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {Object.values(sizeRanges).flat().map((size) => (
            <button
              key={size}
              onClick={() => handleSizeClick(size)}
              className={`py-2 px-3 rounded-md border dark:text-white text-sm text-center ${
                disabledSizes.includes(size)
                  ? "bg-gray-200 dark:bg-gray-400 text-gray-500 cursor-not-allowed"
                  : selectedSizes.includes(size)
                  ? "bg-primary text-white border-primary dark:bg-darkPrimary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-darkBackground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Fit Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-primary dark:text-darkAccent">
          Select Fit
        </label>
        <div className="flex gap-2 mt-2">
          {fits.map((fit) => (
            <button
              key={fit}
              onClick={() => onFitChange(fit)}
              className={`py-2 px-4 rounded-md border dark:text-white text-sm text-center ${
                selectedFit === fit
                  ? "bg-primary text-white border-primary dark:bg-darkPrimary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-darkBackground"
              }`}
            >
              {fit}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {selectedSizes.length > 0 && selectedFit && (
        <div className="mt-4 text-sm text-primary dark:text-darkAccent">
          Selected Sizes:{" "}
          <span className="font-semibold">{selectedSizes.join(", ")}</span>, Fit:{" "}
          <span className="font-semibold">{selectedFit}</span>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
