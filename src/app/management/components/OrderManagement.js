"use client";
import React, { useState, useEffect } from "react";
import MessageModal from "@/app/components/MessageComponent";
import axios from "axios";

const ProductManagement = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [newBatchName, setNewBatchName] = useState("");
  const [viewDetails, setViewDetails] = useState(null);
  const [batchStatus, setBatchStatus] = useState("");
  const [message, setMessage] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [otherDataReady, setOtherDataReady] = useState(false);

  // Fetch products from the backend
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/products/manage");
      const data = response.data;
      setProducts(data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async (order_id) => {
    setError(null);
    setOtherDataReady(false); // Reset to false before fetching new data
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/orders?order_id=${order_id}`);
      const data = response.data; // This is an array of products [{ name, size, quantity }]
      setOrderData(data || []); // Store products in the state
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setOtherDataReady(true); // Mark as ready when the data is fetched
    }
  };
  

  console.log(viewDetails)
  console.log(products)
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle checkbox selection
  const handleSelectOrder = (productId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  // Create a new batch
  const createBatch = async () => {
    if (!newBatchName.trim()) {
      setMessage({ type: "error", text: "Batch name cannot be empty." });
        return;
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/api/products/create_batch", {
        batch_name: newBatchName,
        product_ids: selectedOrders,
      });

      setNewBatchName("");
      setSelectedOrders([]);
      fetchProducts();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to create batch. Please try again." });
        return;
    }
  };

  // Update batch status
  const updateBatchStatus = async (batchName, newStatus) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/products/update_batch_status", {
        batch_name: batchName,
        status: newStatus,
      });
      fetchProducts();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update batch status." });
        return;
    }
  };

  // Update product status
  const updateProductStatus = async (productId, newStatus) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/products/update_status", {
        product_id: productId,
        status: newStatus,
      });
      fetchProducts();
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update product status." });
        return;
    }
  };

  // Group products by batch
  const groupedProducts = products.reduce((groups, product) => {
    const batch = product.batch || "New Batch";
    if (!groups[batch]) groups[batch] = [];
    groups[batch].push(product);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-background dark:bg-darkBackground text-primary dark:text-darkPrimary p-6">
      <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl text-primary dark:text-darkPrimary font-bold">Product Management</h1>
          {message && (
            <MessageModal
                messageType={message.type}
                messageText={message.text}
                onClose={() => setMessage(null)}
            />
          )}
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Create a New Batch</h2>
              <input
                type="text"
                placeholder="Batch Name"
                value={newBatchName}
                onChange={(e) => setNewBatchName(e.target.value)}
                className="border rounded-lg bg-white bg:darkSecondary p-2 mr-4"
              />
              <button
                onClick={createBatch}
                className="bg-primary dark:bg-darkAccent text-white px-4 py-2 rounded-lg dark:hover:bg-darkAccent-200 hover:bg-primary-200"
              >
                Create Batch
              </button>
            </div>

            {Object.keys(groupedProducts).map((batch) => (
              <div key={batch} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{batch} Batch</h3>
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => updateBatchStatus(batch, batchStatus)}
                    className="bg-secondary dark:bg-darkPrimary text-white px-4 py-2 rounded-lg  mb-4"
                  >
                    Update Batch Status
                  </button>

                  <select
                    value={batchStatus}
                    onChange={(e) => setBatchStatus(e.target.value)}
                    className="border rounded-lg p-2 mb-4"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Production">Production</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {groupedProducts[batch].map((product) => (
                    <div
                      key={product.product_id}
                      className="bg-background dark:bg-darkBackground p-4 rounded-lg shadow flex justify-between items-center"
                    >
                      <div>
                        <p><strong>ID:</strong> {product.product_id}</p>
                        <p><strong>Date Ordered:</strong> {product.date_created}</p>
                        <p><strong>Status:</strong> {product.status}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(product.product_id)}
                          onChange={() => handleSelectOrder(product.product_id)}
                          className="form-checkbox border-2 rounded-lg bg-background dark:bg-darkBackground border-primary dark:border-darkAccent"
                        />
                        <select
                          value={product.status}
                          onChange={(e) =>
                            updateProductStatus(product.product_id, e.target.value)
                          }
                          className="border rounded-lg p-2"
                        >
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Production">Production</option>
                          <option value="Packaging">Packaging</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => setViewDetails(product)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {viewDetails && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <h3 className="text-xl font-bold mb-4">Order Details</h3>
                  <p>
                    <strong>Customer Name:</strong> {viewDetails.tracking_data.customer_name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {viewDetails.tracking_data.contact}
                  </p>
                  <p>
                    <strong>Items Ordered:</strong>{" "}
                    {viewDetails.tracking_data.items.join(", ")}
                  </p>
                  {viewDetails && otherDataReady && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Order Details</h3>
                        <p><strong>Customer Name:</strong> {viewDetails.tracking_data?.customer_name}</p>
                        <p><strong>Contact:</strong> {viewDetails.tracking_data?.contact}</p>
                        <p><strong>Email:</strong> {viewDetails.tracking_data?.email}</p>


                        <h4 className="mt-4 text-lg font-semibold">Ordered Products:</h4>
                        {orderData.length > 0 ? (
                          <ul className="mt-2 space-y-2">
                            {orderData.map((product, index) => (
                              <li key={index} className="bg-gray-100 dark:bg-darkSecondary p-4 rounded-lg shadow">
                                <p><strong>Product Name:</strong> {product.name}</p>
                                <p><strong>Size:</strong> {product.size}</p>
                                <p><strong>Quantity:</strong> {product.quantity}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No products found for this order.</p>
                        )}
                        <div className="flex items-center gap-4 mt-4">
                        <button
                          onClick={() => fetchOrders(viewDetails.product_id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Refresh
                        </button>
                        <button
                          onClick={() => setOtherDataReady(false)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Close
                        </button>
                      </div>
                        
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => fetchOrders(viewDetails.product_id)}
                    className="mt-4 bg-accent dark:bg-darkAccent text-white px-4 py-2 rounded-lg"
                  >
                    View Orders
                  </button>

                    <button
                      onClick={() => setViewDetails(null)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
