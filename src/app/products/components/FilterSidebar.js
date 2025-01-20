import React, { useState } from "react";
import { FaTimes, FaFilter } from "react-icons/fa";
import Link from "next/link";

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating Filter Button */}
      <button
        className="fixed bottom-6 right-6 bg-primary dark:bg-darkSecondary text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2 hover:bg-opacity-90 transition transform hover:scale-105 active:scale-95"
        onClick={() => setIsOpen(true)}
      >
        <FaFilter className="w-5 h-5" />
        <span className="hidden sm:block font-medium">Filters</span>
      </button>

      {/* Floating Cart Button */}
      <Link
        href="/cart"
        className="fixed bottom-6 left-6 bg-accent dark:bg-darkAccent text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2 hover:bg-opacity-90 transition transform hover:scale-105 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z" />
        </svg>
        <span className="hidden sm:block text-sm font-medium">Cart</span>
      </Link>

      {/* Filter Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-darkBackground w-11/12 max-w-lg p-6 rounded-xl shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-secondary dark:text-white hover:text-red-600 dark:hover:text-red-600 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>

            {/* Header */}
            <h3 className="text-2xl font-bold text-primary dark:text-darkAccent mb-6 text-center">
              Filter Products
            </h3>

            {/* Filter Sections */}
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="text-lg font-semibold text-secondary dark:text-darkAccent mb-2">
                  Category
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["Platform", "Flats", "Hermes", "Birken Stock", "Palms", "Sandals", "Half Shoes"].map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 bg-gray-100 dark:bg-darkSecondary text-gray-700 dark:text-darkPrimary p-2 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={category}
                        checked={filters.category.includes(category)}
                        onChange={(e) =>
                          onFilterChange("category", e.target.value, e.target.checked)
                        }
                        className="accent-primary dark:accent-darkPrimary"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <h4 className="text-lg font-semibold text-secondary dark:text-darkAccent mb-2">
                  Gender
                </h4>
                <div className="flex gap-3">
                  {["Male", "Female", "Neutral"].map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 bg-gray-100 dark:bg-darkSecondary text-gray-700 dark:text-darkPrimary p-2 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={size}
                        checked={filters.size.includes(size)}
                        onChange={(e) =>
                          onFilterChange("size", e.target.value, e.target.checked)
                        }
                        className="accent-primary dark:accent-darkPrimary"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-lg font-semibold text-secondary dark:text-darkAccent mb-2">
                  Price Range
                </h4>
                <input
                  type="range"
                  min="8000"
                  max="30000"
                  step="1000"
                  value={filters.price}
                  onChange={(e) => onFilterChange("price", e.target.value)}
                  className="w-full accent-primary dark:accent-darkPrimary"
                />
                <p className="mt-2 text-sm text-gray-700 dark:text-darkPrimary">
                  Up to ₦{filters.price}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              <button
                onClick={onClearFilters}
                className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-6 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-primary dark:bg-darkAccent text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
