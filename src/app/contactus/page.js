"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setFormStatus("Thank you! Your message has been sent.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
        <header className={`fixed top-0 left-0 w-full z-50 bg-white shadow-lg transition-all duration-500 ease-in-out transform bg-opacity-90`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-lg font-bold text-primary">D&apos;footprint</Link>
            <nav className="flex space-x-4">
              <Link href="/products" className="text-gray-700 hover:text-primary transition-colors transform hover:scale-105 duration-200">Shop Now</Link>
              <Link href="/faq" className="text-gray-700 hover:text-primary transition-colors transform hover:scale-105 duration-200">FAQ</Link>
              <Link href="/track" className="text-gray-700 hover:text-primary transition-colors transform hover:scale-105 duration-200">Track an Order</Link>
            </nav>
          </div>
        </header>
        <h1 className="text-5xl font-bold mt-12 mb-8 text-[#295255]">Get in Touch</h1>

        {/* Contact Form */}
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white p-10 rounded-md shadow-lg relative"
            style={{
            background: "linear-gradient(135deg, #ffffff 30%, #f0f4f7 100%)",
            }}
        >
            {/* Name Input */}
            <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-4 text-gray-500" />
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#295255] focus:border-transparent transition-all duration-300"
            />
            </div>

            {/* Email Input */}
            <div className="flex flex-col align-center justify-center mb-4 relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-500" />
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#295255] focus:border-transparent transition-all duration-300"
            />
            </div>

            {/* Subject Input */}
            <div className="mb-4 relative">
            <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject (Optional)"
                className="w-full px-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#295255] focus:border-transparent transition-all duration-300"
            />
            </div>

            {/* Message Input */}
            <div className="mb-6 relative">
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#295255] focus:border-transparent transition-all duration-300"
            />
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className="w-full bg-[#295255] hover:bg-[#3a6a6a] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-transform duration-200 hover:scale-105"
            >
            Send Message
            </button>

            {formStatus && (
            <p className="mt-4 text-green-500 font-semibold">{formStatus}</p>
            )}
        </form>

        {/* Contact Details */}
        <div className="mt-10 w-full max-w-lg mx-auto text-center p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            

            <div className="flex flex-col items-center">
                <div className="flex flex-col items-start">
                <h2 className="text-3xl font-bold mb-6 text-[#295255]">Contact Details</h2>
                    <p className="flex items-center mb-4 text-lg text-gray-700 hover:text-[#295255] transition duration-300">
                        <FaWhatsapp className="mr-3 text-[#295255] text-xl min-w-[24px]" />
                        <span className="font-medium">+1 123 456 7890</span>
                    </p>
                    <p className="flex items-center mb-4 text-lg text-gray-700 hover:text-[#295255] transition duration-300">
                        <FaEnvelope className="mr-3 text-[#295255] text-xl min-w-[24px]" />
                        <span className="font-medium">contact@dfootprint.com</span>
                    </p>
                    <p className="flex items-center text-lg text-gray-700 hover:text-[#295255] transition duration-300">
                        <FaMapMarkerAlt className="mr-3 text-[#295255] text-xl min-w-[24px]" />
                        <span className="font-medium">123 Main Street, Lagos, Nigeria</span>
                    </p>
                </div>
            </div>


            {/* Optional Decorative Element */}
            <div className="mt-6 border-t border-gray-300 pt-4">
            <p className="text-sm text-gray-500">
                We're here to assist you! Feel free to reach out anytime.
            </p>
            </div>
        </div>
        </div>

  );
};

export default ContactUs;
