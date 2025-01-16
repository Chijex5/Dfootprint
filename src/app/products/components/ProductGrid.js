// src/components/ProductGrid.jsx
import React from "react";
import Image from "next/image";

const ProductGrid = ({ filters, onQuickView, onClearFilters }) => {
  const products = [
    {
      id: 1,
      name: "Handcrafted Leather Sandals",
      price: 12000,
      image: "./1.jpeg",
      description: "Elegant leather sandals made by skilled artisans.",
      category: "Palms",
      size: "Male",
    },
    {
      id: 2,
      name: "Custom Mules",
      price: 15000,
      image: "./2.jpeg",
      description: "Sophisticated and comfortable custom mules.",
      category: "Sandals",
      size: "Male",
    },
    {
        id: 3,
        name: "Handcrafted Leather Sandals",
        price: 8000,
        image: "./3.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Palms",
        size: "Neutral",
      },
      {
        id: 4,
        name: "Handcrafted Leather Sandals",
        price: 11000,
        image: "./4.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Sandals",
        size: "Neutral",
      },
      {
        id: 5,
        name: "Handcrafted Leather Sandals",
        price: 12500,
        image: "./5.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Female",
      },
      {
        id: 6,
        name: "Handcrafted Leather Sandals",
        price: 19000,
        image: "./6.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Mulles",
        size: "Female",
      },
      {
        id: 7,
        name: "Handcrafted Leather Sandals",
        price: 11000,
        image: "./7.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Female",
      },
      {
        id: 8,
        name: "Handcrafted Leather Sandals",
        price: 15000,
        image: "./8.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Female",
      },
      {
        id: 9,
        name: "Handcrafted Leather Sandals",
        price: 13000,
        image: "./9.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Mulles",
        size: "Female",
      },
      {
        id: 10,
        name: "Handcrafted Leather Sandals",
        price: 11500,
        image: "./10.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Mulles",
        size: "Female",
      },
      {
        id: 11,
        name: "Handcrafted Leather Sandals",
        price: 10000,
        image: "./11.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Mulles",
        size: "Female",
      },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !filters.category.length || filters.category.includes(product.category);
    const matchesSize =
      !filters.size.length || filters.size.includes(product.size);
    const matchesPrice = product.price <= filters.price;
    return matchesCategory && matchesSize && matchesPrice;
  });

  return (
    <div>
        {filteredProducts.length > 0 && (
            <h2 className="text-3xl font-playfair dark:text-white font-bold text-primary text-center mb-8 mt-[55px]">
                Explore Our Collection
            </h2>
        )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md group hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 dark:bg-darkSecondary">
              <h3 className="text-lg font-semibold text-primary dark:text-darkPrimary truncate">
                {product.name}
              </h3>
              <p className="text-accent dark:text-darkAccent text-sm font-medium">₦{product.price}</p>
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
            <img
              src="./14.gif" // Replace with the correct path to your new GIF
              alt="No Products Found"
              className="w-full h-full object-contain"
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