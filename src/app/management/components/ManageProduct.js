import React, { useState } from "react";
import EditProductModal from "./EditProduct";
import MessageModal from "@/app/components/MessageComponent";
import BackendSwitchingClient from "@/app/components/BackendSwitchingClient";

const ManageProductsModal = ({ onClose, products, setProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const deleteProduct = async (productId, setProducts, setMessage) => {
    try {
        setIsLoading(true);
      const response = await BackendSwitchingClient({
        endpoint: `/api/products/delete/${productId}`,
        method: "DELETE",
      });

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        setMessage({ type: "success", text: "Product deleted successfully." });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage({ type: "error", text: "Failed to delete product. Please try again." });
    }finally{
        setIsLoading(false);
    }
  };

  const handleDelete = (productId) => {
    deleteProduct(productId, setProducts, setMessage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background dark:bg-darkBackground p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-primary dark:text-darkAccent text-2xl font-semibold mb-4">
          Manage Products
        </h2>
        {message && (
          <MessageModal
            messageType={message.type}
            messageText={message.text}
            onClose={() => setMessage(null)}
          />
        )}
        {products.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-lg text-accent dark:text-darkPrimary font-medium mb-4">
              No products available. Add new products to get started!
            </p>
            <button
              onClick={onClose}
              className="bg-primary dark:bg-darkPrimary text-white py-2 px-4 rounded-lg hover:bg-secondary dark:hover:bg-darkAccent transition"
            >
              Add Product
            </button>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Name, Category, or Size"
              className="border text-accent dark:text-darkPrimary p-2 rounded-lg w-full mb-4"
            />
            {isEditing && selectedProduct && (
              <EditProductModal
                product={selectedProduct}
                onClose={() => setIsEditing(false)}
                setProducts={setProducts}
              />
            )}
            <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[60vh]">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow-md flex flex-col justify-between"
                >
                  <h3 className="text-lg text-accent dark:text-darkPrimary font-bold">
                    {product.name}
                  </h3>
                  <p className="text-sm text-accent dark:text-darkPrimary">
                    {product.description}
                  </p>
                  <p className="text-primary dark:text-darkAccent font-semibold mt-2">
                    ₦{product.price}
                  </p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => {
                        handleDelete(product.id);
                      }}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                    >
                      {isLoading? "Deleting" : "Delete"}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditing(true);
                      }}
                      className="bg-primary dark:bg-darkSecondary text-white py-1 px-3 rounded-lg hover:bg-secondary transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-6 bg-gray-400 dark:bg-darkSecondary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ManageProductsModal;
