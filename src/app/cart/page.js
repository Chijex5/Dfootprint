"use client";
import React from "react";
import { useCart } from "../components/CartContent";
import Link from "next/link";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ProductImage from "../products/components/Image";

const CartPage = () => {
  const { cart, dispatch } = useCart();

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="p-4 sm:p-8 bg-background dark:bg-darkBackground min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col space-y-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-primary dark:text-darkAccent text-center font-playfair">
          Your Cart
        </h2>

        {/* Empty Cart State */}
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6 min-h-[60vh]">
            {/* Animated Cart GIF */}
            <div className="w-64 h-64 md:w-80 md:h-80">
              <DotLottieReact
                      src="./c.lottie"
                      loop
                      autoplay
                    />
            </div>

            {/* Empty Cart Message */}
            <p className="text-lg sm:text-xl text-secondary dark:text-darkAccent font-oswald">
              Your cart is empty. Start adding your favorite items!
            </p>

            {/* Call-to-Action Button */}
            <Link
              href="/products"
              className="bg-primary dark:bg-darkAccent text-white py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition font-oswald"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="bg-white dark:bg-darkSecondary rounded-lg shadow-md p-4 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6"
                >
                  {/* Product Image */}
                  <div className="w-full md:w-24 h-24 flex-shrink-0">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary dark:text-darkAccent font-playfair">
                      {item.name}
                    </h3>
                    <p className="text-sm text-secondary dark:text-darkPrimary">
                      Size: <span className="font-medium">{item.size}</span>, Fit:{" "}
                      <span className="font-medium">{item.fit}</span>
                    </p>
                    <p className="text-sm text-secondary dark:text-darkPrimary">
                      Price: ₦{item.price} x {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-accent">
                      Subtotal: ₦{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition font-oswald"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Cart Summary */}
            <div className="bg-white dark:bg-darkSecondary rounded-lg shadow-md p-6 space-y-4">
              <h4 className="text-lg font-bold text-primary dark:text-darkAccent font-playfair">
                Cart Summary
              </h4>
              <p className="text-sm text-secondary dark:text-darkPrimary">
                Items Total:{" "}
                <span className="font-medium">
                  ₦
                  {cart.items
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-secondary dark:text-darkPrimary">
                Delivery: <span className="font-medium">Free</span>
              </p>
              <p className="text-sm text-accent font-medium">
                Grand Total:{" "}
                <span className="text-primary dark:text-darkAccent">
                  ₦
                  {cart.items
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="w-full sm:w-auto bg-secondary dark:bg-darkPrimary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition font-oswald"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="w-full sm:w-auto bg-primary dark:bg-darkAccent text-white py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition font-oswald"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
