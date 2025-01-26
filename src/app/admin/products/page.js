"use client"
import React, { useState, useEffect } from "react";
import AddProductModal from "./components/AddProduct";
import ManageProductsModal from "./components/ManageProduct";
import ErrorPage from "@/app/components/ErrorPage";
import Loader from "@/app/components/Loader";
import ProductManagement from "./components/OrderManagement";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BackendSwitchingClient from "@/app/components/BackendSwitchingClient";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showManageProducts, setShowManageProducts] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [isRetrying, setIsRetrying] = useState(false);
  const [showOrderManagement, setShowOrderManagement] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsRetrying(true);
      setError("");
      setLoading(true);
      const response = await await BackendSwitchingClient({
        endpoint: "/api/product-list",
        method: "GET",
      });
      setProducts(response.data);
      setLoading(false);
      setIsRetrying(false);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      setLoading(false);
      setIsRetrying(false);
    }
  };

  const handleOpenOrderManagement = () => {
    setShowOrderManagement(true);
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

  if(showOrderManagement) {
    return (
      <ProductManagement onClose={() => setShowOrderManagement(false)} />
    );
  }

  if(showAddProduct) { 
      return (
        <AddProductModal
          onClose={() => setShowAddProduct(false)}
          products={products}
          setProducts={setProducts}
        />
      )
  }

  if (showManageProducts) {
    return (
      <ManageProductsModal
        onClose={() => setShowManageProducts(false)}
        products={products}
        setProducts={setProducts}
      />
    );
  }

  return (
    <div className="bg-backgroud dark:bg-darkBackground flex min-h-screen">
      <Sidebar 
        onCurrent={"products"}
      />
      <div className="flex-1 flex flex-col">
        <Header onName={"Product Management"} />

        {/* Main Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-12">
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
        
      </div>
    </div>
  );
};

export default ProductManagementPage;
