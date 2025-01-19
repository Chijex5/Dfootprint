"use client"
import React, { useState, useEffect } from "react";
import AddProductModal from "./components/AddProduct";
import ManageProductsModal from "./components/ManageProduct";
import ErrorPage from "../components/ErrorPage";
import Loader from "../components/Loader";
import axios from "axios";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showManageProducts, setShowManageProducts] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsRetrying(true);
      setError("");
      setLoading(true);
      const response = await axios.get("https://dfootprint-backend.onrender.com/api/product-list");
      setProducts(response.data);
      setLoading(false);
      setIsRetrying(false);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      setLoading(false);
      setIsRetrying(false);
    }
  };

  const manageProductOpen = () => {
    fetchProducts();
    setShowManageProducts(true);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
        <ErrorPage
        errorMessage={error}
        onRetry={fetchProducts}
        isRetrying={isRetrying}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 bg:background dark:bg-darkBackground text-secondary dark:text-darkAccent min-h-screen min-w-full">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {/* Main Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-primary text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-90 transition"
          onClick={() => setShowAddProduct(true)}
        >
          <h2 className="text-2xl font-semibold mb-2">Add a Product</h2>
          <p className="text-sm text-white/80">Add a new product to the store</p>
        </div>

        <div
          className="bg-secondary text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-90 transition"
          onClick={manageProductOpen}
        >
          <h2 className="text-2xl font-semibold mb-2">Manage Products</h2>
          <p className="text-sm text-white/80">Search and update existing products</p>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <AddProductModal
          onClose={() => setShowAddProduct(false)}
          products={products}
          setProducts={setProducts}
        />
      )}

      {/* Manage Products Modal */}
      {showManageProducts && (
        <ManageProductsModal
          onClose={() => setShowManageProducts(false)}
          products={products}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default ProductManagementPage;
