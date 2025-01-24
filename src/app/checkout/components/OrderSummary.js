import React, { useState } from "react";

const OrderSummary = ({ orderDetails, onConfirm, onDownloadInvoice, loading, onError, OnRetry }) => {
  const {
    name,
    contact,
    state,
    busStop,
    deliveryCompany,
    pickupLocation,
    orderId,
    cartItems,
  } = orderDetails;

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleConfirmOrder = () => {
    onConfirm();
    setOrderConfirmed(true);
  };
  console.log(!orderId)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary mb-4">Order Summary</h2>

      {!orderConfirmed && (
        <>
          {/* Delivery Details */}
          <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
            <p className="text-sm text-secondary dark:text-darkPrimary">
              <strong>Name:</strong> {name}
            </p>
            <p className="text-sm text-secondary dark:text-darkPrimary">
              <strong>Contact:</strong> {contact}
            </p>
            <p className="text-sm text-secondary dark:text-darkPrimary">
              <strong>State:</strong> {state}
            </p>
            <p className="text-sm text-secondary dark:text-darkPrimary">
              <strong>Bus Stop:</strong> {busStop}
            </p>
            <p className="text-sm text-secondary dark:text-darkPrimary">
              <strong>pickupLocation:</strong> {pickupLocation}
            </p>
            <p className="text-sm text-secondary dark:text-darkPrimary">
              <strong>Delivery Company:</strong> {deliveryCompany}
            </p>
          </div>

          {/* Cart Contents */}
          <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Cart Contents</h3>
            {cartItems?.length > 0 ? (
              <ul className="space-y-2">
                {cartItems.map((item) => (
                  <li key={item.id} className="text-sm text-secondary dark:text-darkPrimary">
                    {item.name} x{item.quantity} ({item.price} each)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-secondary dark:text-darkPrimary">
                No items in the cart.
              </p>
            )}
          </div>
        </>
      )}

      {/* Order ID and Download Invoice */}
      {orderConfirmed && (
        <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Order ID</h3>
          <p className="text-sm text-secondary dark:text-darkPrimary">
            Keep this order ID for tracking purposes:
          </p>
          {!onError && (
          <p className="text-lg font-bold text-primary dark:text-darkAccent mt-2">
            {!loading? orderId : "Generating..."}
          </p>
          )}
          {onError && (
            <p 
            onClick={OnRetry}
            className="text-lg font-bold text-red-500 dark:text-red-400 mt-2 cursor-pointer">
            Error generating order ID
            </p>
          )}
          <button
            onClick={onDownloadInvoice}
            disabled={!orderId}
            className={`mt-4 w-full text-white py-3 rounded-lg hover:bg-opacity-90 transition-all ${
              !orderId ? "bg-gray-400 dark:bg-gray-600" : "bg-secondary dark:bg-darkAccent"
            }`}                      
          >
            Download Invoice
          </button>
        </div>
      )}

      {/* Confirm Button */}
      {!orderConfirmed && (
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition"
        >
          Confirm Order
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
