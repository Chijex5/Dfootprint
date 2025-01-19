import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const MessageModal = ({
  messageType = "info", // "success", "error", or "info"
  messageText = "This is a message.",
  onClose,
  autoClose = true,
  autoCloseDelay = 5000, // Delay in milliseconds
}) => {
  // Automatically close the modal after a delay
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  // Message type styles
  const typeStyles = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
    info: "bg-blue-100 text-blue-800 border-blue-400",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`w-11/12 max-w-md p-6 rounded-lg shadow-lg border ${
          typeStyles[messageType]
        } relative`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-gray-800"
        >
          <FaTimes />
        </button>

        {/* Message Content */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          {messageType === "success" && (
            <div className="flex items-center justify-center bg-green-500 rounded-full h-16 w-16 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 12l2 2l4-4m5 5a9 9 0 11-18 0a9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          {messageType === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636L5.636 18.364m0-12.728L18.364 18.364"
              />
            </svg>
          )}
          {messageType === "info" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16a8 8 0 000 16z"
              />
            </svg>
          )}

          {/* Message Text */}
          <p className="text-lg font-medium">{messageText}</p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
