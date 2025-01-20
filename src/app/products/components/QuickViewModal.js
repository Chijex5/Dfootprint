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

    dispatch({ type: "ADD_TO_CART", payload: productWithSize });

    setMessage({
      type: "success",
      text: "Product added to cart successfully!",
    });

    setTimeout(() => {
      onClose();
      setMessage(null);
    }, 2000);
    console.log(cart);
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-darkBackground rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto transition-transform transform scale-100">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold dark:text-white text-primary font-playfair">
            {product.name}
          </h3>
          <button
            onClick={onClose}
            className="text-primary dark:text-white hover:text-red-600 dark:hover:text-red-700 text-2xl transition"
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
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex flex-col items-center space-y-4">
            <ProductImage src={product.image} alt={product.name} />
            <p className="text-xl font-semibold text-primary dark:text-darkAccent">
              ₦{product.price}
            </p>
            <p className="text-sm text-gray-600 dark:text-darkPrimary text-center">
              {product.description || "Handcrafted with the finest materials."}
            </p>
            <p className="text-xs italic text-gray-500 dark:text-darkAccent">
              * Sizes in gray are currently unavailable.
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
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
              className="w-full bg-primary dark:bg-darkAccent text-white py-3 rounded-lg hover:bg-opacity-90 transition text-lg font-semibold"
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
