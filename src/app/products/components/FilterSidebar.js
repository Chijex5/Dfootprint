// src/components/FilterPanel.jsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating Filter Button */}
      <button
        className="fixed bottom-4 flex right-4 bg-primary text-white font-playfair p-4 rounded-full shadow-lg z-50 hover:bg-opacity-90 transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
        onClick={() => setIsOpen(true)}
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path d="M21 18V21H19V18H17V16H23V18H21ZM5 18V21H3V18H1V16H7V18H5ZM11 6V3H13V6H15V8H9V6H11ZM11 10H13V21H11V10ZM3 14V3H5V14H3ZM19 14V3H21V14H19Z"></path>
        </svg>
        <span className="ml-2 font-semibold">Filters</span>
      </button>

      <Link
        href="/cart"
        className="fixed flex font-playfair bottom-6 left-6 w-150 bg-primary text-white py-3 px-4 rounded-full shadow-xl z-50 hover:bg-opacity-90 transition flex items-center justify-center gap-2"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
        </svg>
        <span className="text-sm font-semibold">Cart</span>
      </Link>


      {/* Filter Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-primary">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-secondary text-2xl hover:text-red-600 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-secondary mb-2">Category</h4>
              <ul className="space-y-2">
                {["Mules", "Slippers", "Sandals", "Palms"].map((category) => (
                  <li key={category}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={category}
                        checked={filters.category.includes(category)}
                        onChange={(e) =>
                          onFilterChange(
                            "category",
                            e.target.value,
                            e.target.checked
                          )
                        }
                        className="text-accent focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-secondary mb-2">Gender</h4>
              <ul className="space-y-2">
                {["Male", "Female", "Neutral"].map((size) => (
                  <li key={size}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={size}
                        checked={filters.size.includes(size)}
                        onChange={(e) =>
                          onFilterChange("size", e.target.value, e.target.checked)
                        }
                        className="text-accent focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{size}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-secondary mb-2">
                Price Range
              </h4>
              <input
                type="range"
                min="8000"
                max="30000"
                step="1000"
                value={filters.price}
                onChange={(e) => onFilterChange("price", e.target.value)}
                className="w-full accent-primary"
              />
              <p className="text-sm text-gray-700 mt-2">Up to ₦{filters.price}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={onClearFilters}
                className="bg-secondary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
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
