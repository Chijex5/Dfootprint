import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ImageUploader = ({ designFiles, onChange }) => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
    onChange([...designFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = designFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviews);
    onChange(updatedFiles);
  };

  return (
    <div className="space-y-4">
      <div className="border border-dashed border-primary dark:border-darkAccent rounded-lg p-4">
        <label
          htmlFor="design-upload"
          className="block text-center cursor-pointer text-primary dark:text-darkAccent hover:underline"
        >
          <span className="text-sm font-semibold">Click to upload files</span>
          <input
            type="file"
            id="design-upload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Preview Section */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {previewImages.map((src, index) => (
            <div
              key={index}
              className="relative group border rounded-lg overflow-hidden"
            >
              <img
                src={src}
                alt={`Design ${index + 1}`}
                className="w-full h-24 object-cover"
              />
              <button
                onClick={() => handleRemoveFile(index)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
