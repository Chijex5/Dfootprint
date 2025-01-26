import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BatchManagementPage() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batchDetails, setBatchDetails] = useState([]);
  const [newBatchName, setNewBatchName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    setLoading(true);
    // Fetch batches from backend
    const response = await fetch("/api/batches");
    const data = await response.json();
    setBatches(data);
    setLoading(false);
  };

  const fetchBatchDetails = async (batchId) => {
    setLoading(true);
    // Fetch batch details from backend
    const response = await fetch(`/api/batches/${batchId}`);
    const data = await response.json();
    setBatchDetails(data.orders);
    setSelectedBatch(batchId);
    setLoading(false);
  };

  const createNewBatch = async () => {
    if (!newBatchName.trim()) return;

    setLoading(true);
    // Send request to create a new batch
    const response = await fetch("/api/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newBatchName }),
    });

    if (response.ok) {
      setNewBatchName("");
      fetchBatches();
    }
    setLoading(false);
  };

  const markBatchAs = async (batchId, status) => {
    setLoading(true);
    // Update batch status in the backend
    await fetch(`/api/batches/${batchId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchBatches();
    if (batchId === selectedBatch) fetchBatchDetails(batchId);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Batch Management</h1>

      {/* Create New Batch Section */}
      <Card className="p-4">
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="New Batch Name"
              value={newBatchName}
              onChange={(e) => setNewBatchName(e.target.value)}
              disabled={loading}
            />
            <Button onClick={createNewBatch} disabled={loading}>
              Create Batch
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Batch List */}
      <Card className="p-4">
        <CardContent>
          <Table>
            <Thead>
              <Tr>
                <Th>Batch Name</Th>
                <Th>Creation Date</Th>
                <Th>Orders</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {batches.map((batch) => (
                <Tr key={batch.id}>
                  <Td>{batch.name}</Td>
                  <Td>{new Date(batch.created_at).toLocaleDateString()}</Td>
                  <Td>{batch.order_count}</Td>
                  <Td>{batch.status}</Td>
                  <Td>
                    <Button
                      onClick={() => fetchBatchDetails(batch.id)}
                      variant="outline"
                      className="mr-2"
                    >
                      View Details
                    </Button>
                    <Select
                      onValueChange={(value) => markBatchAs(batch.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ready for Production">
                          Ready for Production
                        </SelectItem>
                        <SelectItem value="In Production">
                          In Production
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardContent>
      </Card>

      {/* Batch Details */}
      {selectedBatch && (
        <Card className="p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">
              Orders in Batch: {batches.find((b) => b.id === selectedBatch)?.name}
            </h2>
            <Table>
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Size</Th>
                  <Th>Quantity</Th>
                  <Th>Cost</Th>
                </Tr>
              </Thead>
              <Tbody>
                {batchDetails.map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.product_name}</Td>
                    <Td>{order.size}</Td>
                    <Td>{order.quantity}</Td>
                    <Td>${order.cost}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardContent>
        </Card>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}
