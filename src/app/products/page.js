"use client";
import React, { useState } from "react";
import FilterPanel from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import QuickViewModal from "./components/QuickViewModal";
import Link from "next/link";


const ShopNowPage = () => {
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    price: 30000,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (key, value, checked) => {
    setFilters((prev) => {
      if (key === "price") {
        return { ...prev, price: value };
      }
      const values = checked
        ? [...prev[key], value]
        : prev[key].filter((item) => item !== value);
      return { ...prev, [key]: values };
    });
  };

  const handleClearFilters = () => {
    setFilters({ category: [], size: [], price: 30000 });
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background min-h-screen p-4">
      <header className={`fixed top-0 left-0 w-full z-50 bg-white shadow-lg transition-all duration-500 ease-in-out transform bg-opacity-90`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-lg font-bold text-primary">D&apos;footprint</Link>
            <nav className="flex space-x-4">
              <Link href="/Cart" className="text-gray-700 hover:text-primary font-bold text-lg transition-colors transform hover:scale-105 duration-200">Cart</Link>
            </nav>
          </div>
        </header>

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Product Grid */}
        <ProductGrid filters={filters} onQuickView={handleQuickView} />

        {/* Quick View Modal */}
        {isModalOpen && (
          <QuickViewModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseQuickView}
          />
        )}
    </div>
  );
};

export default ShopNowPage;
