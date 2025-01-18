
const SizeSelector = ({
  selectedSize,
  setSelectedSize,
  selectedFit,
  setSelectedFit,
  disabledSizes = [],
}) => {
  const sizeRanges = {
    "21-30": [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    "31-40": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    "41-50": [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  };

  const fits = ["Small", "Normal", "Big"];

  const sizeRange = Object.keys(sizeRanges).find((range) =>
    sizeRanges[range].includes(selectedSize)
  );

  return (
    <div>
      {/* Size Range and Size Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium dark:text-darkPrimary text-primary font-oswald">
          Select Size
        </label>
        <div className="grid grid-cols-5 gap-2">
          {Object.values(sizeRanges).flat().map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              disabled={disabledSizes.includes(size)}
              className={`py-2 px-3 rounded-md border dark:text-white dark:bg-darkBackground text-sm ${
                disabledSizes.includes(size)
                  ? "bg-gray-200 dark:bg-gray-400 text-gray-400 cursor-not-allowed" // Disabled style
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
          <label className="block dark:text-darkPrimary text-sm font-medium text-primary font-oswald">
            Select Fit
          </label>
          <div className="flex gap-2">
            {fits.map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(fit)}
                className={`py-2 px-4 rounded-md border dark:text-white dark:bg-darkBackground text-sm ${
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
