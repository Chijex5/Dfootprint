import React, { useState } from "react";
import EditProductModal from "./EditProduct";
import MessageModal from "@/app/components/MessageComponent";
import BackendSwitchingClient from "@/app/components/BackendSwitchingClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success("Product deleted successfully.");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete product. Please try again." });
      toast.error(error.response?.data?.message || "Failed to delete product.");
    }finally{
        setIsLoading(false);
    }
  };

  const handleDelete = (productId) => {
    deleteProduct(productId, setProducts, setMessage);
  };

  return (
    <div className="py-12 px-6 bg-background dark:bg-darkBackground flex items-center justify-center">
      <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-primary dark:text-darkAccent text-2xl font-semibold mb-4">
          Manage Products
        </h2>
        <ToastContainer />
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
                      className="bg-primary dark:bg-darkAccent text-white py-1 px-3 rounded-lg hover:bg-secondary transition"
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
          className="mt-6 bg-primary dark:bg-darkAccent text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ManageProductsModal;
