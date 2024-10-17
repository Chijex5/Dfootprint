"use client";

import { useState } from "react";

// Function to generate fake FAQs
const generateFakeFAQs = (count) => {
  const fakeFAQs = [];
  for (let i = 1; i <= count; i++) {
    fakeFAQs.push({
      question: `Common Question ${i}`,
      answer: `This is the detailed explanation for question ${i}, covering all aspects you may need to know.`,
    });
  }
  return fakeFAQs;
};

const FAQ = () => {
  const initialFaqs = [
    {
      question: "What is the return policy?",
      answer: "You can return any item within 30 days of purchase as long as it's in its original condition and packaging.",
    },
    {
      question: "How can I track my order?",
      answer: (
        <>
          You can track your order by visiting the{" "}
          <a href="/track" className="text-blue-500 underline">
            Track Your Order
          </a>{" "}
          page.
        </>
      ),
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer worldwide shipping. Shipping costs and delivery times vary.",
    },
    // Add 80 fake FAQs for testing
    ...generateFakeFAQs(80),
  ];

  const [faqs, setFaqs] = useState(initialFaqs);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredFaqs = initialFaqs.filter((faq) => {
      const questionText = faq.question.toLowerCase();
      const answerText = typeof faq.answer === "string" ? faq.answer.toLowerCase() : "";
      return questionText.includes(term) || answerText.includes(term);
    });
    setFaqs(filteredFaqs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>

      {/* Search bar */}
      <div className="w-full md:w-3/4 lg:w-1/2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search FAQs..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="w-full md:w-3/4 lg:w-1/2 space-y-4">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => handleToggle(index)}
                className="w-full p-4 text-left text-lg font-semibold bg-white hover:bg-gray-100 focus:outline-none transition-colors"
              >
                {faq.question}
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-white text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No FAQs match your search.</p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
