// src/components/ProductGrid.jsx
import React from "react";
import Image from "next/image";

const ProductGrid = ({ filters, onQuickView }) => {
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
      <h2 className="text-3xl font-playfair font-bold text-primary text-center mb-8 mt-12">
        Explore Our Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md group hover:shadow-lg transition"
          >
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-primary truncate">
                {product.name}
              </h3>
              <p className="text-accent text-sm font-medium">₦{product.price}</p>
              <button
                onClick={() => onQuickView(product)}
                className="mt-4 bg-primary text-white py-2 px-4 rounded w-full hover:bg-opacity-90 transition font-oswald"
              >
                Quick View
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;