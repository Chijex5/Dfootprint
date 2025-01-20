import React, { useState } from "react";
import ButtonLoader from "@/app/components/ButtonLoader";
import MessageModal from "@/app/components/MessageComponent";
import { FaTimes } from "react-icons/fa";
import BackendSwitchingClient from "@/app/components/BackendSwitchingClient";

const AddProductModal = ({ onClose, setProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: [], // Holds the image file object
    description: "",
    category: "",
    size: "",
    disabledSizes: [],
  });
  const [insertedImages, setInsertedImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
   const [message, setMessage] = useState(null);

  const categories = ["Platform", "Flats", "Hermes", "Sandals", "Birken Stock", "Palms", "Half Shoes"];
  const sizes = ["Female", "Male", "Neutral"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Store the selected file object
    setFormData({ ...formData, image: file });
    setInsertedImages(true);
  };

  const handleDisabledSizesChange = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const size = parseInt(e.target.value.trim(), 10);
      if (!isNaN(size) && size >= 36 && size <= 46 && !formData.disabledSizes.includes(size)) {
        setFormData({
          ...formData,
          disabledSizes: [...formData.disabledSizes, size],
        });
        e.target.value = "";
      }
    }
  };

  const removeDisabledSize = (sizeToRemove) => {
    setFormData({
      ...formData,
      disabledSizes: formData.disabledSizes.filter((size) => size !== sizeToRemove),
    });
  };

  const handleAddProduct = async () => {

    if (!formData.name.trim()) {
        setMessage({ type: "error", text: "Product name is required." });
        return;
      }
      if (!formData.price || isNaN(Number(formData.price))) {
        setMessage({ type: "error", text: "A valid price is required." });
        return;
      }
      if (!formData.category) {
        setMessage({ type: "error", text: "Please select a category." });
        return;
      }
      if (!formData.size) {
        setMessage({ type: "error", text: "Please select a gender category." });
        return;
      }
      if (!formData.image) {
        setMessage({ type: "error", text: "Please upload an image." });
        return;
      }

    const productData = new FormData(); // Create a FormData object for the request
    productData.append("name", formData.name);
    productData.append("price", formData.price);
    productData.append("description", formData.description);
    productData.append("category", formData.category);
    productData.append("size", formData.size);
    productData.append("image", formData.image); // Append the image file
    productData.append("disabledSizes", JSON.stringify(formData.disabledSizes)); // Append disabledSizes as JSON string

    try {
      setIsLoading(true)
      const response = await BackendSwitchingClient({
        endpoint: "/api/products/new",
        method: "POST",
        data: productData,
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      // Add the new product to the product list
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setMessage({ type: "success", text: "Product added successfully." });
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage({ type: "error", text: "Failed to add product. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background dark:bg-darkBackground p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-primary dark:text-darkAccent mb-4">Add New Product</h2>
        {message && (
          <MessageModal
            messageType={message.type}
            messageText={message.text}
            onClose={() => setMessage(null)}
          />
        )}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border dark:border-gray-700 text-accent dark:text-darkPrimary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border dark:border-gray-700 text-accent dark:text-darkPrimary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border dark:border-gray-700 p-3 text-accent dark:text-darkPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            className="border dark:border-gray-700 text-accent dark:text-darkPrimary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary"
          >
            <option value="">Select a Gender Category</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border dark:border-gray-700 text-accent dark:text-darkPrimary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary col-span-2"
          ></textarea>
          <div className="relative col-span-2">
            {/* Hidden File Input */}
            <input
                type="file"
                multiple
                id="file-upload"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 text-accent dark:text-darkPrimary w-full h-full cursor-pointer z-10"
            />

            {/* Custom Label */}
            <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full p-3 border-2 border-dashed border-primary dark:border-darkPrimary rounded-lg cursor-pointer bg-gray-100 dark:bg-darkSecondary text-primary dark:text-darkAccent hover:bg-gray-200 dark:hover:bg-darkPrimary transition-all"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                />
                </svg>
                <span className="text-sm font-medium">{!insertedImages? 'Choose Files' : 'Change File'}</span>
            </label>

            {/* File Preview */}
            <div className="mt-4">
                {insertedImages ? (
                <ul className="space-y-2">
                    
                    <li
                        className="flex items-center space-x-4 bg-gray-100 dark:bg-darkSecondary p-2 rounded-lg shadow-sm"
                    >
                        <img
                        src={URL.createObjectURL(formData.image)}
                        alt={`File Preview ${formData.image.name}`}
                        className="w-12 h-12 rounded-md object-cover"
                        />
                        <span className="text-sm text-gray-700 dark:text-darkAccent truncate">
                        {formData.image.name} 
                        </span>
                        
                    </li>
                </ul>
                ) : (
                <p className="text-sm text-gray-600 dark:text-darkPrimary">
                    No files uploaded yet.
                </p>
                )}
            </div>
            </div>


          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2 text-primary dark:text-darkAccent">Disabled Sizes</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.disabledSizes.map((size) => (
                <span
                  key={size}
                  className="bg-primary text-white  py-1 px-2 rounded-lg flex items-center gap-2 dark:bg-darkAccent"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => removeDisabledSize(size)}
                    className="text-white hover:text-red-500"
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Enter size and press Enter"
              onKeyDown={handleDisabledSizesChange}
              className="border dark:border-gray-700 text-accent dark:text-darkPrimary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-darkPrimary w-full"
            />
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddProduct}
            disabled={isLoading}
            className="bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-secondary dark:bg-darkPrimary dark:hover:bg-darkAccent transition-all"
          >
            {isLoading? <ButtonLoader /> : "Add Product"}
            
          </button>
          <button
            onClick={onClose}
            className="ml-4 bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
