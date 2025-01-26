"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar"
import Modal from "../components/Modal"; // Reusable modal component

const ProductManagement = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [newBatchName, setNewBatchName] = useState("");
  const [viewDetails, setViewDetails] = useState(null);
  const [batchStatus, setBatchStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products/manage");
      setProducts(response.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createBatch = async () => {
    if (!newBatchName.trim()) {
      toast.error("Batch name cannot be empty.");
      return;
    }
    try {
      await axios.post("/api/products/create_batch", {
        batch_name: newBatchName,
        product_ids: selectedOrders,
      });
      setNewBatchName("");
      setSelectedOrders([]);
      fetchProducts();
      toast.success("Batch created successfully!");
    } catch {
      toast.error("Failed to create batch.");
    }
  };

  const updateBatchStatus = async (batchName, newStatus) => {
    try {
      await axios.post("/api/products/update_batch_status", {
        batch_name: batchName,
        status: newStatus,
      });
      fetchProducts();
      toast.success("Batch status updated.");
    } catch {
      toast.error("Failed to update batch status.");
    }
  };

  const updateProductStatus = async (productId, newStatus) => {
    try {
      await axios.post("/api/products/update_status", {
        product_id: productId,
        status: newStatus,
      });
      fetchProducts();
      toast.success("Product status updated.");
    } catch {
      toast.error("Failed to update product status.");
    }
  };

  const groupedProducts = products.reduce((groups, product) => {
    const batch = product.batch || "New Batch";
    if (!groups[batch]) groups[batch] = [];
    groups[batch].push(product);
    return groups;
  }, {});

  return (
    <div className="flex h-screen">
      <Sidebar active="products" /> {/* Left navigation sidebar */}
      <div className="flex-grow p-6 bg-background dark:bg-darkBackground">
        <ToastContainer />
        <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primary dark:text-darkPrimary">Product Management</h1>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Close
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Create a New Batch</h2>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    placeholder="Enter batch name"
                    className="border rounded p-2 flex-1"
                  />
                  <button onClick={createBatch} className="bg-accent dark:bg-darkAccent text-white px-4 py-2 rounded">
                    Create
                  </button>
                </div>
              </div>

              {Object.keys(groupedProducts).map((batch) => (
                <div key={batch} className="mb-6">
                  <h3 className="text-lg font-bold mb-4">{batch} Batch</h3>
                  <div className="space-y-4">
                    {groupedProducts[batch].map((product) => (
                      <div
                        key={product.product_id}
                        className="flex justify-between items-center bg-background dark:bg-darkBackground p-4 rounded shadow"
                      >
                        <div>
                          <p><strong>ID:</strong> {product.product_id}</p>
                          <p><strong>Status:</strong> {product.status}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <select
                            value={product.status}
                            onChange={(e) => updateProductStatus(product.product_id, e.target.value)}
                            className="border rounded p-2"
                          >
                            <option value="">Change Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Production">Production</option>
                          </select>
                          <button
                            onClick={() => setViewDetails(product)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {viewDetails && (
          <Modal onClose={() => setViewDetails(null)} title="Product Details">
            <p><strong>Product ID:</strong> {viewDetails.product_id}</p>
            <p><strong>Status:</strong> {viewDetails.status}</p>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
