"use client";
import React from "react";
import { X } from "lucide-react";

const Modal = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary dark:text-darkPrimary">{title}</h2>
          <button
            onClick={onClose}
            className="text-secondary dark:text-darkAccent hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
