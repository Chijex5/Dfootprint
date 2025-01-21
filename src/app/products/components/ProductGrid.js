import React, { useState, useEffect } from "react";
import ProductImage from "./Image";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import BackendSwitchingClient from "@/app/components/BackendSwitchingClient";
import ErrorPage from "@/app/components/ErrorPage";

const ProductGrid = ({ filters, onQuickView, onClearFilters }) => {
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
const [isRetrying, setIsRetrying] = useState(false);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  // Apply filters to products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !filters.category.length || filters.category.includes(product.category);
    const matchesSize =
      !filters.size.length || filters.size.includes(product.size);
    const matchesPrice = product.price <= filters.price;
    return matchesCategory && matchesSize && matchesPrice;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-darkBackground">
            <DotLottieReact
              src="../animation.lottie"
              loop
              autoplay
            />
        </div>
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
    <div>
      {filteredProducts.length > 0 && (
        <h2 className="text-3xl font-playfair dark:text-white font-bold text-primary text-center mb-8 mt-[80px]">
          Explore Our Collection
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md group hover:shadow-lg transition"
          >
            <div className="relative w-full h-64">
                <ProductImage src={product.image} alt={product.name} />
            </div>
            <div className="p-4 dark:bg-darkSecondary">
              <h3 className="text-lg font-semibold text-primary dark:text-darkPrimary truncate">
                {product.name}
              </h3>
              <p className="text-accent dark:text-darkAccent text-sm font-medium">
                ₦{product.price}
              </p>
              <button
                onClick={() => onQuickView(product)}
                className="mt-4 bg-primary text-white dark:bg-darkPrimary py-2 px-4 rounded w-full hover:bg-opacity-90 transition font-oswald"
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center w-screen justify-center text-center space-y-6 min-h-screen">
            {/* Animated GIF */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
              <DotLottieReact
                src="./main.lottie"
                loop
                autoplay
                />
            </div>
            {/* No Products Found Message */}
            <p className="text-lg sm:text-xl md:text-2xl text-secondary font-oswald">
              Sorry, no products found!
            </p>

            {/* Call-to-Action Button */}
            <button
              onClick={onClearFilters}
              className="bg-primary text-white py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition font-oswald"
            >
              Browse All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
