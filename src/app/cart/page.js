"use client";
import React from "react";
import { useCart } from "../components/CartContent";
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
  const { cart, dispatch } = useCart();


  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="p-8">
      <div className="flex flex-col items-center justify-center h-full">
  {/* Title */}
  <h2 className="text-2xl font-bold text-primary mb-6">Your Cart</h2>

  {/* Empty Cart State */}
  {cart.items.length === 0 ? (
    <div className="text-center">
      {/* Empty Cart Icon */}
      <div className="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18l-1.68 9.403a4 4 0 01-3.96 3.597H8.64a4 4 0 01-3.96-3.597L3 3zM3 3h18M9 21a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>
      </div>

      {/* Message */}
      <p className="text-lg text-gray-600 mb-4">
        Your cart is empty. Start adding some items!
      </p>

      {/* Call-to-Action Button */}
      <Link href="/products"
        className="bg-primary text-white py-2 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition"
      >
        Continue Shopping
      </Link>
    </div>

      ) : (
        <ul className="divide-y divide-gray-200 bg-white shadow-md rounded-lg p-4">
          {cart.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-4 px-4 rounded-md hover:bg-gray-50 transition duration-300"
            >
              <div className="flex items-center space-x-4">
                {/* Image Placeholder (optional) */}
                <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Item Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-sm font-medium text-red-600 hover:text-red-800 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

      )}
      {cart.items.length > 0 && (
      <button
        onClick={() => dispatch({ type: "CLEAR_CART" })}
        className="mt-4 bg-secondary text-white py-2 px-4 rounded hover:bg-opacity-90"
      >
        Clear Cart
      </button>
      )}
    </div>
  </div>
  );
};

export default CartPage;
