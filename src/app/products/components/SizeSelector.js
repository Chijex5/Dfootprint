import React, { useState } from "react";
import MessageModal from "../../components/MessageComponent";

const SizeSelector = ({
  selectedSize,
  setSelectedSize,
  selectedFit,
  setSelectedFit,
  disabledSizes = [],
}) => {
  const [infoMessage, setInfoMessage] = useState(null);

  const sizeRanges = {

    "36-40": [36, 37, 38, 39, 40],
    "41-56": [41, 42, 43, 44, 45, 46],
  };

  const fits = ["Small", "Normal", "Big"];

  const handleSizeClick = (size) => {
    if (disabledSizes.includes(size)) {
      setInfoMessage(
        "This size is unavailable for the selected instance of the shoe. Please check other options for the same shoe."
      );
    } else {
      setSelectedSize(size);
    }
  };

  return (
    <div>
      {/* Info Modal */}
      {infoMessage && (
        <MessageModal
          messageType="info"
          messageText={infoMessage}
          onClose={() => setInfoMessage(null)}
        />
      )}

      {/* Size Range and Size Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium dark:text-darkPrimary text-primary font-oswald">
          Select Size
        </label>
        <div className="grid grid-cols-5 gap-2">
          {Object.values(sizeRanges)
            .flat()
            .map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`py-2 px-3 rounded-md border text-sm dark:text-white dark:bg-darkBackground ${
                  disabledSizes.includes(size)
                    ? "bg-gray-200 dark:bg-gray-400 text-gray-400 hover:bg-gray-300 cursor-pointer"
                    : selectedSize === size
                    ? "bg-primary dark:bg-darkPrimary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
        </div>
      </div>

      {/* Fit Selector */}
      {selectedSize && (
        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-darkPrimary text-primary font-oswald">
            Select Fit
          </label>
          <div className="flex gap-2">
            {fits.map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(fit)}
                className={`py-2 px-4 rounded-md border text-sm dark:text-white dark:bg-darkBackground ${
                  selectedFit === fit
                    ? "bg-primary dark:bg-darkPrimary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {fit}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {selectedSize && selectedFit && (
        <div className="text-sm dark:text-white text-secondary mt-2">
          Selected Size: <span className="font-bold">{selectedSize}</span>, Fit:{" "}
          <span className="font-bold">{selectedFit}</span>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
