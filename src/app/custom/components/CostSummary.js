import React, { useEffect } from "react";

const CostSummary = ({ estimatedCost, formData }) => {
  const baseCost = 10000; // Base cost for a custom order
  const materialCost = {
    Leather: 5000,
    Canvas: 3000,
    Suede: 4000,
    Synthetic: 2000,
    Rubber: 2500,
  };

  const colorCost = 500; // Fixed additional cost for color selection
  const priorityCost = 3000; // Additional cost for priority order

  // Calculate estimated cost
  useEffect(() => {
    const calculateCost = () => {
      let cost = baseCost;

      // Add material cost
      if (formData.material) {
        cost += materialCost[formData.material] || 0;
      }

      // Add color cost
      if (formData.color) {
        cost += colorCost;
      }

      // Add priority cost
      if (formData.priorityOrder) {
        cost += priorityCost;
      }

      // Calculate size-dependent cost
      if (formData.sizes && formData.sizes.length > 0) {
        cost += formData.sizes.length * 1000; // 1000 per size
      }

      return cost;
    };

    const totalCost = calculateCost();
    estimatedCost = totalCost;
  }, [formData, estimatedCost]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary dark:text-darkAccent">
        Cost Summary
      </h2>
      <div className="border rounded-lg p-4 bg-gray-100 dark:bg-darkSecondary space-y-2">
        <p className="text-secondary dark:text-darkPrimary">
          <strong>Base Cost:</strong> ₦{baseCost}
        </p>
        <p className="text-secondary dark:text-darkPrimary">
          <strong>Material:</strong> {formData.material || "Not selected"} (
          ₦{formData.material ? materialCost[formData.material] : "0"})
        </p>
        <p className="text-secondary dark:text-darkPrimary">
          <strong>Color:</strong> {formData.color || "Not selected"} (₦
          {formData.color ? colorCost : "0"})
        </p>
        <p className="text-secondary dark:text-darkPrimary">
          <strong>Priority Order:</strong> {formData.priorityOrder ? "Yes" : "No"}{" "}
          (₦{formData.priorityOrder ? priorityCost : "0"})
        </p>
        <p className="text-secondary dark:text-darkPrimary">
          <strong>Sizes:</strong> {formData.sizes.length || "0"} (₦
          {formData.sizes.length * 1000})
        </p>
      </div>
      <div className="text-lg font-bold text-primary dark:text-darkAccent mt-4">
        Estimated Total: ₦{estimatedCost}
      </div>
    </div>
  );
};

export default CostSummary;
