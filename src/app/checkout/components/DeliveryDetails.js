import React, {useState} from "react";
import Select from "react-select";
import MessageModal from "@/app/components/MessageComponent";

const DeliveryDetails = ({ formData, onFormChange, mappedData, onNext }) => {
  const { state, busStop, deliveryCompany } = formData;
  const [message, setMessage] = useState(null);

  // Transforming mappedData for use in React-Select
  const stateOptions = Object.keys(mappedData).map((state) => ({
    value: state,
    label: state,
  }));

  const busStopOptions = state
    ? Object.keys(mappedData[state] || {}).map((stop) => ({
        value: stop,
        label: stop,
      }))
    : [];

  const companyOptions =
    state && busStop
      ? Object.keys(mappedData[state]?.[busStop] || {}).map((company) => ({
          value: company,
          label: company,
        }))
      : [];

  // Handle State Change
  const handleStateChange = (selectedOption) => {
    const selectedState = selectedOption ? selectedOption.value : "";
    onFormChange("state", selectedState);
    onFormChange("busStop", ""); // Reset dependent fields
    onFormChange("deliveryCompany", "");
  };

  // Handle Bus Stop Change
  const handleBusStopChange = (selectedOption) => {
    const selectedBusStop = selectedOption ? selectedOption.value : "";
    onFormChange("busStop", selectedBusStop);
    onFormChange("deliveryCompany", ""); // Reset company field
  };

  // Handle Company Change
  const handleCompanyChange = (selectedOption) => {
    const selectedCompany = selectedOption ? selectedOption.value : "";
    onFormChange("deliveryCompany", selectedCompany);

    // Store the corresponding address for the selected company
    if (
      state &&
      busStop &&
      selectedCompany &&
      mappedData[state]?.[busStop]?.[selectedCompany]
    ) {
      const companyAddress = mappedData[state][busStop][selectedCompany];
      onFormChange("pickupLocation", companyAddress);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (state && busStop && deliveryCompany) {
      onNext(); // Proceed to the next step
    } else {
      setMessage({ type: "error", text: "Please fill out all required fields." });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-primary dark:text-white mb-4">
        Delivery Details
      </h2>

      {/* State Selector */}
      <div className="text-gray-700 dark:text-darkAccent">
        <label className="block text-sm font-medium text-gray-700 dark:text-darkAccent mb-2">
          Select State
        </label>
        <Select
          options={stateOptions}
          value={state ? { value: state, label: state } : null}
          onChange={handleStateChange}
          placeholder="Select a state..."
        />
      </div>

      {/* Bus Stop Selector */}
      <div  className="text-gray-700 dark:text-darkAccent">
        <label className="block text-sm font-medium text-gray-700 dark:text-darkAccent mb-2">
          Select Well-Known Bus Stop
        </label>
        <Select
          options={busStopOptions}
          value={busStop ? { value: busStop, label: busStop } : null}
          onChange={handleBusStopChange}
          isDisabled={!state}
          placeholder="Select a bus stop..."
        />
      </div>

      {/* Delivery Company Selector */}
      <div  className="text-gray-700 dark:text-darkAccent">
        <label className="block text-sm font-medium text-gray-700 dark:text-darkAccent mb-2">
          Select Delivery Company
        </label>
        <Select
          options={companyOptions}
          value={deliveryCompany ? { value: deliveryCompany, label: deliveryCompany } : null}
          onChange={handleCompanyChange}
          isDisabled={!busStop || companyOptions.length === 0}
          placeholder="Select a company..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition"
        >
          Confirm Delivery Details
        </button>
      </div>
    </form>
  );
};

export default DeliveryDetails;
