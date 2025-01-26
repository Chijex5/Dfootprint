import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BatchlessOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newBatchName, setNewBatchName] = useState("");

  // Fetch batchless orders
  const fetchBatchlessOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/orders?batch=null"); // Adjust to match your API endpoint
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching batchless orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch existing batches
  const fetchBatches = async () => {
    try {
      const response = await axios.get("/api/batches"); // Adjust to match your API endpoint
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  // Assign order to a batch
  const assignToBatch = async (orderId, batchId) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { batch: batchId }); // Adjust to match your API endpoint
      fetchBatchlessOrders();
    } catch (error) {
      console.error("Error assigning order to batch:", error);
    }
  };

  // Create a new batch
  const createNewBatch = async () => {
    if (!newBatchName.trim()) return;
    try {
      const response = await axios.post("/api/batches", { name: newBatchName });
      setNewBatchName("");
      fetchBatches();
      return response.data.id; // Assuming the API returns the new batch ID
    } catch (error) {
      console.error("Error creating new batch:", error);
    }
  };

  // Handle creating a new batch and assigning an order to it
  const handleCreateAndAssign = async (orderId) => {
    const batchId = await createNewBatch();
    if (batchId) assignToBatch(orderId, batchId);
  };

  useEffect(() => {
    fetchBatchlessOrders();
    fetchBatches();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">New and Batchless Orders</h1>

      {/* Create New Batch Section */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="New Batch Name"
          value={newBatchName}
          onChange={(e) => setNewBatchName(e.target.value)}
        />
        <Button onClick={createNewBatch}>Create Batch</Button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Products</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No batchless orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.customerName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.products.map((product, index) => (
                      <div key={index}>
                        {product.name} - {product.size} x {product.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">${order.total}</td>
                  <td className="border border-gray-300 px-4 py-2 space-y-2">
                    <select
                      className="w-full border rounded-md p-2"
                      onChange={(e) => assignToBatch(order.id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Assign to Batch
                      </option>
                      {batches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={() => handleCreateAndAssign(order.id)}
                      className="w-full"
                    >
                      Create New Batch & Assign
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchlessOrdersPage;
