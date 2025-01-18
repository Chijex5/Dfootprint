import React, { useState } from "react";
import FilterPanel from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import QuickViewModal from "./QuickViewModal";

function Holder() {
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
    
      const onClearFilters = () => {
        setFilters({
          category: [],
          size: [],
          price: 30000,
        });
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
    <div>
      <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

      <ProductGrid filters={filters} onQuickView={handleQuickView}   onClearFilters={onClearFilters}/>

      {isModalOpen && (
          <QuickViewModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseQuickView}
          />
        )}
    </div>
  );
}

export default Holder;