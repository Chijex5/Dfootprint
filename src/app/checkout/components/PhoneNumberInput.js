import React from "react";

const PhoneNumberInput = ({ contact, onFormChange }) => {
  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;

    // Strip out non-numeric characters
    const sanitizedInput = input.replace(/\D/g, "");

    // Validate: Ensure it doesn't start with 0 and is at most 10 digits
    if (sanitizedInput.length <= 10 && !sanitizedInput.startsWith("0")) {
      onFormChange("contact", sanitizedInput);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-darkAccent mb-1">
        Phone Number (WhatsApp)
      </label>
      <div className="flex items-center border dark:border-gray-700 rounded-lg text-primary dark:text-darkPrimary focus-within:ring-2 focus-within:ring-primary dark:focus-within:ring-darkPrimary">
        {/* Country Code (Static) */}
        <span className="bg-gray-200 dark:bg-darkAccent px-3 py-2 text-gray-700 dark:text-white border-r dark:border-gray-700 rounded-l-lg">
          +234
        </span>

        {/* Phone Number Input */}
        <input
          type="text"
          name="contact"
          value={contact}
          onChange={handlePhoneNumberChange}
          placeholder="Enter 10-digit phone number"
          className="w-full p-3 focus:outline-none rounded-r-lg"
        />
      </div>

      {/* Validation Message (Optional) */}
      {contact && contact.length < 10 && (
        <p className="text-sm text-red-500 mt-1">
          Phone number must be exactly 10 digits long.
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
