import React from "react";

const MaterialSelector = ({
  selectedMaterial,
  selectedColor,
  onMaterialChange,
  onColorChange,
}) => {
  const materials = ["Leather", "Canvas", "Suede", "Synthetic", "Rubber"];
  const colors = ["Black", "White", "Brown", "Blue", "Red", "Green"];

  return (
    <div className="space-y-6">
      {/* Material Selection */}
      <div>
        <label className="block text-sm font-medium mb-2 text-primary dark:text-darkAccent">
          Select Material
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {materials.map((material) => (
            <button
              key={material}
              onClick={() => onMaterialChange(material)}
              className={`py-2 px-4 rounded-lg border dark:bg-darkBackground dark:text-darkPrimary text-sm font-medium ${
                selectedMaterial === material
                  ? "bg-primary text-white border-primary"
                  : "bg-white dark:bg-darkSecondary border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-darkPrimary"
              }`}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium mb-2 text-primary dark:text-darkAccent">
          Select Color
        </label>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`py-2 px-4 rounded-lg border dark:bg-darkBackground dark:text-darkPrimary text-sm font-medium ${
                selectedColor === color
                  ? "bg-primary text-white border-primary"
                  : "bg-white dark:bg-darkSecondary border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-darkPrimary"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialSelector;
