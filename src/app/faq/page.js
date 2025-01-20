"use client"
import React, { useState } from "react";

const FAQPage = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns for non-customized products within 14 days of delivery. Items must be unused and in their original packaging. Custom orders are non-refundable.",
    },
    {
      question: "Who is responsible for delivery costs?",
      answer:
        "Delivery costs are covered by the customer unless specified otherwise during promotions or special offers.",
    },
    {
      question: "How long does it take to create my order?",
      answer:
        "Production typically takes 5–10 business days for standard items. Custom orders may take longer, depending on complexity.",
    },
    {
      question: "How can I send my design for a custom order?",
      answer:
        "You can upload your design directly on our website through the 'Custom Order' section. Include clear specifications and reference images.",
    },
    {
      question: "How long will it take to know if you can create my custom order?",
      answer:
        "Our team will review your design and respond within 24–48 hours with confirmation and pricing details.",
    },
    {
      question: "What happens if I order the wrong size?",
      answer:
        "For non-custom products, you can exchange for the correct size within 14 days. Custom orders are made to your specifications and are non-exchangeable.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "Refunds are available for defective non-custom items returned within the specified return period. Custom orders are not eligible for refunds.",
    },
    {
      question: "How does the custom order process work?",
      answer:
        "1. Submit your design via our website.\n2. Receive a confirmation and quote within 24–48 hours.\n3. Make payment to confirm your order.\n4. Your custom footwear will be crafted and shipped to you.",
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-darkBackground text-secondary dark:text-darkAccent py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-primary dark:text-white text-center mb-8">
          Frequently Asked Questions (FAQs)
        </h1>
        <p className="text-center text-gray-600 dark:text-darkAccent mb-12">
          Find answers to common questions about our products, services, and
          policies.
        </p>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b ${
                expandedQuestion === index
                  ? "border-primary dark:border-darkPrimary"
                  : "border-gray-300 dark:border-darkSecondary"
              } pb-4`}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex justify-between items-center w-full focus:outline-none"
              >
                <h2
                  className={`text-lg font-semibold ${
                    expandedQuestion === index
                      ? "text-primary dark:text-darkPrimary"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  {faq.question}
                </h2>
                <span
                  className={`text-xl transition-transform duration-300 ${
                    expandedQuestion === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {expandedQuestion === index && (
                <p className="mt-4 text-gray-600 dark:text-darkAccent whitespace-pre-line">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
