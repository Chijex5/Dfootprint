"use client";

import { useState, useRef } from "react";

const Track = () => {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const inputRefs = useRef([]);

  const validateOrderId = (id) => {
    // Check if the length is 8 and if it contains at least 3 uppercase letters
    const uppercaseLetters = id.match(/[A-Z]/g) || [];
    if (id.length === 8 && uppercaseLetters.length >= 3) {
      setError("");
      return true;
    } else {
      setError("Invalid order ID");
      return false;
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value.toUpperCase();
    const newOrderId = orderId.split("");
    newOrderId[index] = value;
    const updatedOrderId = newOrderId.join("");
    setOrderId(updatedOrderId);

    if (value && index < 7) {
      inputRefs.current[index + 1].focus();
    }

    // Only validate when the length is 8
    if (updatedOrderId.length === 8) {
      validateOrderId(updatedOrderId);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!orderId[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOrderId = orderId.split("");
        newOrderId[index] = "";
        const updatedOrderId = newOrderId.join("");
        setOrderId(updatedOrderId);

        // Only validate when the length is 8
        if (updatedOrderId.length === 8) {
          validateOrderId(updatedOrderId);
        } else {
          setError("");
        }
      }
    }
  };

  const handleSubmit = () => {
    // Mock data for tracking details
    setTrackingResult({
      status: "In Transit",
      expectedDelivery: "October 20, 2024",
      currentLocation: "Los Angeles, CA",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
      <h2 className="text-3xl font-bold mb-8">Track Your Order</h2>

      {/* Order ID Input */}
      <div className="flex flex-col items-start mb-6">
        <label htmlFor="orderId" className="text-xl font-semibold mb-2">
          Order ID
        </label>
        <div className="flex space-x-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={orderId[index] || ""}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-10 p-2 border border-white rounded-md text-black text-center shadow-md focus:outline-none"
            />
          ))}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!!error || orderId.length !== 8}
        className={`px-6 py-3 text-lg font-semibold rounded-md transition-all duration-300 shadow-lg ${
          !!error || orderId.length !== 8
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-accent hover:bg-secondary"
        }`}
      >
        Submit
      </button>

      {/* Tracking Result */}
      {trackingResult && (
        <div className="mt-12 p-8 bg-secondary text-black rounded-lg shadow-2xl w-full md:w-3/4 lg:w-1/2">
          <h3 className="text-2xl font-bold mb-4 border-b border-accent pb-2">
            Order Details
          </h3>
          <p className="mb-2">
            <strong>Status:</strong> {trackingResult.status}
          </p>
          <p className="mb-2">
            <strong>Expected Delivery:</strong> {trackingResult.expectedDelivery}
          </p>
          <p>
            <strong>Current Location:</strong> {trackingResult.currentLocation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Track;
