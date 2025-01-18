// src/components/ProductGrid.jsx
import React from "react";
import Image from "next/image";

const ProductGrid = ({ filters, onQuickView, onClearFilters }) => {
  const products = [
    {
      id: 1,
      name: "Birken Stock",
      price: 20000,
      image: "./1.jpeg",
      description: "Inspired by one of our customers",
      category: "Birken Stock",
      size: "Male",
    },
    {
      id: 2,
      name: "Male Flat Palms",
      price: 17000,
      image: "./2.jpeg",
      description: "Sophisticated and comfortable.",
      category: "Flats",
      size: "Male",
    },
    {
        id: 3,
        name: "Male Double Sole",
        price: 19000,
        image: "./3.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Palms",
        size: "Male",
      },
      {
        id: 4,
        name: "Hermes Sandals",
        price: 15000,
        image: "./4.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Hermes",
        size: "Neutral",
      },
      {
        id: 5,
        name: "Flat Female Footware",
        price: 8000,
        image: "./5.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Flats",
        size: "Female",
      },
      {
        id: 6,
        name: "Purple Platforms",
        price: 15000,
        image: "./6.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Platforms",
        size: "Female",
      },
      {
        id: 7,
        name: "Flat Female Footware",
        price: 8000,
        image: "./7.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Flats",
        size: "Female",
      },
      {
        id: 8,
        name: "White Comfy Platforms",
        price: 15000,
        image: "./8.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Platforms",
        size: "Female",
      },
      {
        id: 9,
        name: "Green Platform",
        price: 15000,
        image: "./9.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Platform",
        size: "Female",
      },
      {
        id: 10,
        name: "Platform",
        price: 15000,
        image: "./10.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Platform",
        size: "Female",
      },
      {
        id: 11,
        name: "Flat Female Footware",
        price: 8000,
        image: "./11.jpeg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Flats",
        size: "Female",
      },
      {
        id: 14,
        name: "Hermes Slides",
        price: 15000,
        image: "./15.jpg",
        description: "Hermes Slide for sizes ranging from 21 - 40",
        category: "Hermes",
        size: "Neutral",
        disabledSizes: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
      },
      {
        id: 15,
        name: "Hermes Slides",
        price: 18000,
        image: "./15.jpg",
        description: "Hermes Slide for sizes ranging from 41 - 50",
        category: "Hermes",
        size: "Neutral",
        disabledSizes: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      },
      {
        id: 16,
        name: "Handcrafted Leather Sandals",
        price: 16000,
        image: "./16.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Mulles",
        size: "Female",
      },
      {
        id: 17,
        name: "Handcrafted Leather Sandals",
        price: 14000,
        image: "./17.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Palms",
        size: "Neutral",
      },
      {
        id: 18,
        name: "Handcrafted Leather Sandals",
        price: 16000,
        image: "./18.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Palms",
        size: "Male",
      },
      {
        id: 19,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./19.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Mulles",
        size: "Female",
      },
      {
        id: 20,
        name: "Handcrafted Leather Sandals",
        price: 19000,
        image: "./20.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Sandals",
        size: "Male",
      },
      {
        id: 21,
        name: "Handcrafted Leather Sandals",
        price: 15000,
        image: "./21.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Palms",
        size: "Male",
      },
      {
        id: 22,
        name: "Handcrafted Leather Sandals",
        price: 15000,
        image: "./22.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Mulles",
        size: "Male",
      },
      {
        id: 23,
        name: "Handcrafted Leather Sandals",
        price: 14000,
        image: "./23.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Palms",
        size: "Male",
      },
      {
        id: 24,
        name: "Handcrafted Leather Sandals",
        price: 12500,
        image: "./24.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Birken Stock",
        size: "Male",
      },
      {
        id: 25,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./25.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 26,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./26.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 27,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./27.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 28,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./28.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 29,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./29.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 30,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./30.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 31,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./31.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 32,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./32.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 33,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./33.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 34,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./34.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 35,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./35.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 36,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./36.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 37,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./37.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 38,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./38.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 39,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./39.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 40,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./25.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 41,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./41.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 42,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./42.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 43,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./43.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 44,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./44.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 45,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./45.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 46,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./46.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 47,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./47.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 48,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./48.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 49,
        name: "Handcrafted Leather Sandals",
        price: 13500,
        image: "./49.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Slippers",
        size: "Male",
      },
      {
        id: 50,
        name: "Flat Female Footware",
        price: 8000,
        image: "./50.jpg",
        description: "Elegant leather sandals made by skilled artisans.",
        category: "Flats",
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