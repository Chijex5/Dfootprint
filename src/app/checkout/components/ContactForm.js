import React, { useState } from "react";
import MessageModal from "@/app/components/MessageComponent";
import PhoneNumberInput from "./PhoneNumberInput";

const ContactForm = ({ formData, onFormChange, onNext }) => {
  const { name, contact, email } = formData; // Destructure formData for cleaner usage
  const [message, setMessage] = useState(null);

  const validateForm = () => {
    const { name, contact, email } = formData;

    if (!name || !contact || !email) {
      setMessage({ type: "error", text: "All fields are required." });
      return false;
    }

    // Validate phone number (10 digits)
    if (contact.length !== 10) {
      setMessage({
        type: "error",
        text: "Phone number must be exactly 10 digits.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Please provide a valid email address." });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onNext(formData); // Pass formData to the parent
      setMessage({ type: "success", text: "Contact information saved!" });
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-darkSecondary rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary dark:text-darkPrimary mb-4">Contact Information</h2>

      {message && (
        <MessageModal
          messageType={message.type}
          messageText={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-darkAccent mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => onFormChange("name", e.target.value)}
            placeholder="Enter your full name"
            className="w-full p-3 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-primary dark:text-darkPrimary dark:focus:ring-darkPrimary"
          />
        </div>
        <PhoneNumberInput contact={contact} onFormChange={onFormChange} />

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-darkAccent mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onFormChange("email", e.target.value)}
            placeholder="Enter your email address"
            className="w-full p-3 border dark:border-gray-700 rounded-lg text-gray-700 dark:text-darkAccent focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-secondary dark:bg-darkAccent transition-all"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
