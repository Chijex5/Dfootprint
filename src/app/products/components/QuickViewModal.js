import React, { useState } from "react";
import { useCart } from "../../components/CartContent";
import SizeSelector from "./SizeSelector";
import { FaTimes } from "react-icons/fa";
import MessageModal from "../../components/MessageComponent";
import ProductImage from "./Image";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { cart, dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFit, setSelectedFit] = useState("");
  const [message, setMessage] = useState(null);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedFit) {
      // Show error message
      setMessage({
        type: "error",
        text: "Please select both size and fit before adding to the cart!",
      });
      return;
    }

    const productWithSize = {
      ...product,
      size: selectedSize,
      fit: selectedFit,
    };

    // Dispatch the product to the cart
    dispatch({ type: "ADD_TO_CART", payload: productWithSize });

    // Show success message
    setMessage({
      type: "success",
      text: "Product added to cart successfully!",
    });

    // Close the modal after a short delay
    setTimeout(() => {
      onClose();
      setMessage(null);
    }, 2000);
    console.log(cart)
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkSecondary rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold dark:text-white text-primary font-playfair">
            {product.name}
          </h3>
          <button
            onClick={onClose}
            className="text-primary dark:text-white dark:hover:text-red-700 text-2xl hover:text-red-600 transition"
          >
             <FaTimes />
          </button>
        </div>

        {/* Message Modal */}
        {message && (
          <MessageModal
            messageType={message.type}
            messageText={message.text}
            onClose={() => setMessage(null)}
          />
        )}

        {/* Content */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Image */}
          <div className="flex flex-col items-center justify-between">
            <ProductImage
              src={product.image}
              alt={product.name}
            />

            <div>
            <p className="text-accent dark:text-darkAccent font-medium mb-2">₦{product.price}</p>
            <p className="text-sm dark:text-darkPrimary text-gray-700 mb-4">
              {product.description || "Handcrafted with the finest materials."}
            </p>
            </div>
            <div className="flex items-center space-x-2">
                <p className="text-sm dark:text-darkAccent text-gray-700">SIZES IN GRAY ARE CURRENTLY UNAVAILABLE.</p>
            </div>

          </div>

          {/* Product Details */}
          <div>
            {/* Size and Fit Selection */}
            <SizeSelector
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedFit={selectedFit}
              setSelectedFit={setSelectedFit}
              disabledSizes={product.disabledSizes || []}
            />

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary dark:bg-darkAccent text-white py-2 rounded hover:bg-opacity-90 transition font-oswald"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default QuickViewModal;
