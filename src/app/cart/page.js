"use client";
import React from "react";
import { useCart } from "../components/CartContent";
import Link from "next/link";

const CartPage = () => {
  const { cart, dispatch } = useCart();


  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="p-4 sm:p-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col space-y-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-primary text-center font-playfair">
          Your Cart
        </h2>
    
        {/* Empty Cart State */}
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6 min-h-[60vh]">
            {/* Animated Cart GIF */}
            <div className="w-screen h-64 bg-red sm:w-[400px] sm:h-80 md:w-[350px] md:h-[550px] lg:w-[400px] lg:h-[350px]">
              <img
                src="./12.gif" // Replace with the correct path
                alt="Animated Empty Cart"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Empty Cart Message */}
            <p className="text-lg sm:text-xl text-secondary font-oswald">
              Your cart is empty. Start adding your favorite items!
            </p>

            {/* Call-to-Action Button */}
            <Link
              href="/products"
              className="bg-primary text-white py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition font-oswald"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="space-y-6">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-md p-4 space-y-4 sm:space-y-0 sm:space-x-6"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
    
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary font-playfair">
                      {item.name}
                    </h3>
                    <p className="text-sm text-secondary">
                      Size: <span className="font-medium">{item.size}</span>, Fit:{" "}
                      <span className="font-medium">{item.fit}</span>
                    </p>
                    <p className="text-sm text-secondary">
                      Price: ₦{item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-accent">
                      Subtotal: ₦{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
    
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-800 transition font-oswald"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
    
            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h4 className="text-lg font-bold text-primary font-playfair">
                Cart Summary
              </h4>
              <p className="text-sm text-secondary">
                Items Total:{" "}
                <span className="font-medium">
                ₦{cart.items
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-secondary">
                Delivery: <span className="font-medium">Free</span>
              </p>
              <p className="text-sm text-accent font-medium">
                Grand Total:{" "}
                <span className="text-primary">
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
                className="w-full sm:w-auto bg-secondary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition font-oswald"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="w-full sm:w-auto bg-primary text-white py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition font-oswald"
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
