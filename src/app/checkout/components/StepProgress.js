// components/StepProgress.js
import React from "react";

const StepProgress = ({ currentStep }) => {
  const steps = ["Contact Information", "Delivery Details", "Order Summary"];

  return (
    <div className="flex items-center justify-center space-x-4 my-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step Number */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 
              ${currentStep === index + 1
                ? "bg-primary text-white"
                : currentStep > index + 1
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"}
            `}
          >
            {index + 1}
          </div>

          {/* Step Label */}
          <p
            className={`ml-2 text-sm font-medium transition-colors duration-300 
              ${currentStep >= index + 1 ? "text-primary" : "text-gray-400"}`}
          >
            {step}
          </p>

          {/* Divider */}
          {index < steps.length - 1 && (
            <div
              className={`w-10 h-[2px] mx-2 transition-all duration-300 
                ${currentStep > index + 1 ? "bg-primary" : "bg-gray-300"}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
