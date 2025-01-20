import React, { useState, useEffect } from "react";
import ButtonLoader from "@/app/components/ButtonLoader";
import MessageModal from "@/app/components/MessageComponent";
import ProductImage from "@/app/products/components/Image";
import BackendSwitchingClient from "@/app/components/BackendSwitchingClient";
import { FaTimes } from "react-icons/fa";

const EditProductModal = ({ product, onClose, setProducts }) => {
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
        size: product.size,
        disabledSizes: JSON.parse(product.disabledSizes || "[]"), 
      });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  console.log(product)

  const categories = ["Platform", "Flats", "Hermes", "Birken Stock", "Palms", "Sandals", "Half Shoes"];
  const sizes = ["Female", "Male", "Neutral"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleEditProduct = async () => {

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

    const updatedProductData = {
      ...formData,
      disabledSizes: JSON.stringify(formData.disabledSizes), // Ensure the disabledSizes are sent as JSON
    };

    try {
      setIsLoading(true);
      await BackendSwitchingClient({
        endpoint: `/api/products/${product.id}`,
        method: "PUT",
        data: updatedProductData,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const response = await BackendSwitchingClient({
        endpoint: "/api/product-list",
        method: "GET",
      });
      setProducts(response.data);
      setMessage({ type: "success", text: "Product updated successfully." });
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage({ type: "error", text: "Failed to update product. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-background dark:bg-darkBackground p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-primary dark:text-darkAccent mb-4">
            Edit Product
            </h2>
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

            {/* Disabled Sizes */}
            <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 text-primary dark:text-darkAccent">
                Disabled Sizes
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                {formData.disabledSizes.map((size) => (
                    <span
                    key={size}
                    className="bg-primary text-white py-1 px-2 rounded-lg flex items-center gap-2 dark:bg-darkPrimary"
                    >
                    {size}
                    <button
                        type="button"
                        onClick={() => removeDisabledSize(size)}
                        className="text-white hover:text-red-500 dark:text-darkAccent dark:hover:text-red-500"
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

            {/* Display Product Image */}
            <div className="col-span-2 flex justify-center">
                <div className="relative w-full h-64">
                <ProductImage
                    src={formData.image}
                    alt={formData.name}
                    className="object-contain max-w-full max-h-full"
                />
                </div>
            </div>
            </form>

            <div className="flex justify-end mt-6">
            <button
                onClick={handleEditProduct}
                className="bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-secondary dark:bg-darkPrimary dark:hover:bg-darkAccent transition-all"
            >
                {isLoading ? <ButtonLoader /> : "Save Changes"}
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

export default EditProductModal;
