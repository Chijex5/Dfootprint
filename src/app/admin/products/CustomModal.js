import React from 'react';

const CustomModal = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all duration-200"
          >
            {title === "Confirm Deletion" ? "Cancel" : "Close"}
          </button>
          {title === "Confirm Deletion" && (
          <button
            onClick={onConfirm}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-all duration-200"
          >
            Confirm
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
