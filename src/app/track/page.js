"use client";
import React, { useState } from "react";
import BackendSwitchingClient from "../components/BackendSwitchingClient";

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    let value = e.target.value;

  // Convert to uppercase
  value = value.toUpperCase();

  // Add hyphen after the first 3 characters
  if (value.length === 3) {
    value = value.slice(0, 3) + "-" + value.slice(3);
  }

  // Update the state
  setOrderId(value);
};



  const handleSubmit = async () => {
    if (!orderId || !orderId.startsWith("ORD-")) {
      setError("Please enter a valid Order ID.");
      return;
    }
    setError(false);
    setLoading(true);

    try {
      // Use BackendSwitchingClient to fetch the data
      const response = await BackendSwitchingClient({
        endpoint: `/api/orders/metadata?order_id=${orderId}`,
        method: "GET",
      });

      const data = response.data;
      console.log(data);

      if (!data) {
        setError("Order ID not found. Please check and try again.");
      } else {
        setOrderData(data);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderOrderStatus = (status) => {
    const statuses = ["Pending", "Confirmed", "Production", "Packaging", "Delivered", "Completed"];
    return (
      <div className="flex justify-between items-center mt-4">
        {statuses.map((stage, index) => (
          <div key={stage} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[1.6rem] ${
                index < statuses.indexOf(status) ? "bg-green-500" : index === statuses.indexOf(status) ? "bg-primary" : "bg-gray-300"
              }`}
            >
              {index < statuses.indexOf(status) &&(
                <i class='bx bx-check bx-tada'></i>
              )}
            {index === statuses.indexOf(status) && (
              <i class='bx bx-loader-alt bx-spin bx-rotate-90' ></i>            )}
            </div>
            <p
              className={`mt-2 text-sm ${
                index < statuses.indexOf(status) ? "text-green-500" :  index === statuses.indexOf(status) ? "text-primary" : "text-white"
              }`}
            >
              {stage}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background dark:bg-darkBackground flex items-center justify-center px-6">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-primary dark:text-darkPrimary text-center mb-6">
          Track Your Order
        </h2>

        {!orderData ? (
          <>
            <p className="text-secondary dark:text-darkPrimary text-center mb-4">
              Enter your Order ID to view your product and order status.
            </p>
            <input
              type="text"
              value={orderId}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg text-secondary dark:text-darkSecondary focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              placeholder="Enter Order ID"
              maxLength={13}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition"
            >
              {loading ? "Loading..." : "Track Order"}
            </button>
          </>
        ) : (
          <>
            {/* Order Status */}
            <div className="bg-gray-100 dark:bg-darkBackground p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-lg font-semibold text-primary dark:text-darkPrimary mb-4">
                Order Status
              </h3>
              {renderOrderStatus(orderData.status)}
            </div>

            {/* Order Details */}
            <div className="bg-gray-100 dark:bg-darkBackground p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-primary dark:text-darkPrimary mb-4">
                Order Details
              </h3>
              <p className="text-sm text-secondary dark:text-darkPrimary">
                <strong>Name:</strong> {orderData.tracking_data[0]?.name || "N/A"}
              </p>
              <p className="text-sm text-secondary dark:text-darkPrimary">
                <strong>Email:</strong> {orderData.tracking_data[0]?.email || "N/A"}
              </p>
              <p className="text-sm text-secondary dark:text-darkPrimary">
                <strong>Contact:</strong> {orderData.tracking_data[0]?.contact || "N/A"}
              </p>
              <p className="text-sm text-secondary dark:text-darkPrimary">
                <strong>Product:</strong> {orderData.tracking_data[0]?.product || "N/A"}
              </p>
              <p className="text-sm text-secondary dark:text-darkPrimary">
                <strong>Quantity:</strong> {orderData.tracking_data[0]?.quantity || 0}
              </p>
              <p className="text-sm text-secondary dark:text-darkPrimary">
                <strong>Status:</strong> {orderData.status}
              </p>
            </div>

            <button
              onClick={() => setOrderData(null)}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition mt-6"
            >
              Track Another Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
