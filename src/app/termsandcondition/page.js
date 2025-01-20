"use client"
import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background text-secondary dark:bg-darkSecondary flex">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 h-full z-50 md:w-1/4 bg-white dark:bg-darkBackground shadow-lg p-6 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Sections</h2>
        <nav>
          <ul className="space-y-4 text-gray-700 dark:text-darkAccent">
            {[
              "overview",
              "ordering",
              "shipping",
              "returns",
              "responsibilities",
              "liability",
              "property",
            ].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`hover:text-primary dark:hover:text-darkPrimary ${
                    activeSection === section
                      ? "text-primary dark:text-darkPrimary font-semibold"
                      : ""
                  }`}
                >
                  {section
                    .charAt(0)
                    .toUpperCase()
                    .concat(section.slice(1).replace("-", " "))}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Hamburger Menu for Mobile */}
      <button
        onClick={handleMenuToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary dark:bg-darkPrimary text-white rounded-md shadow-lg"
      >
        <FaBars />
      </button>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 md:ml-[25%]">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-center mb-4 text-primary dark:text-white">
              Terms of Service
            </h1>
            <p className="text-center text-gray-600 dark:text-darkAccent">
              Last updated: January 20, 2025
            </p>
          </header>

          {/* Sections */}
          {[
            {
              id: "overview",
              title: "General Overview",
              content: (
                <p className="leading-relaxed text-gray-700 dark:text-white">
                  D&apos;Footprint specializes in creating custom handmade
                  footwear tailored to your unique specifications. By placing an
                  order or engaging with our website, you acknowledge and agree
                  to the following:
                </p>
              ),
            },
            {
              id: "ordering",
              title: "Ordering Process",
              content: (
                <ul className="list-disc pl-5 space-y-4 text-gray-700 dark:text-white">
                  <li>
                    <strong>Custom Orders:</strong> All orders are handmade
                    according to the size, description, and preferences provided
                    by the customer. Ensure that all information is accurate
                    before finalizing your order.
                  </li>
                  <li>
                    <strong>Payment Terms:</strong> Full payment is required at
                    the time of order placement unless otherwise agreed upon.
                  </li>
                  <li>
                    <strong>Order Modifications:</strong> Changes can only be
                    made within <strong>24 hours</strong>.
                  </li>
                </ul>
              ),
            },
            {
              id: "shipping",
              title: "Shipping Policy",
              content: (
                <ul className="list-disc pl-5 space-y-4 text-gray-700 dark:text-white">
                  <li>
                    <strong>Delivery Timeframe:</strong> Orders are processed
                    and shipped promptly, but delays caused by couriers are
                    outside our control.
                  </li>
                  <li>
                    <strong>Shipping Costs:</strong> Customers cover shipping
                    costs unless stated otherwise.
                  </li>
                  <li>
                    <strong>Lost or Damaged Parcels:</strong> We are not liable
                    for parcels once shipped. Contact the courier for
                    assistance.
                  </li>
                </ul>
              ),
            },
            {
              id: "returns",
              title: "Returns and Exchanges",
              content: (
                <p className="text-gray-700 dark:text-white">
                  For details, refer to our{" "}
                  <a
                    href="/return-policy"
                    className="text-primary dark:text-background font-semibold hover:underline"
                  >
                    Return Policy
                  </a>
                  .
                </p>
              ),
            },
            {
              id: "responsibilities",
              title: "Customer Responsibilities",
              content: (
                <ul className="list-disc pl-5 space-y-4 text-gray-700 dark:text-white">
                  <li>Maintain confidentiality of your account information.</li>
                  <li>
                    Refrain from misuse of our services or violating laws.
                  </li>
                  <li>
                    Provide accurate contact details for updates or support.
                  </li>
                </ul>
              ),
            },
            {
              id: "liability",
              title: "Limitations of Liability",
              content: (
                <ul className="list-disc pl-5 space-y-4 text-gray-700 dark:text-white">
                  <li>
                    Errors caused by incorrect customer-provided details.
                  </li>
                  <li>Delays or issues beyond our reasonable control.</li>
                  <li>
                    Indirect or consequential damages from our products.
                  </li>
                </ul>
              ),
            },
            {
              id: "property",
              title: "Intellectual Property",
              content: (
                <p className="text-gray-700 dark:text-white">
                  All content, designs, and materials are the exclusive property
                  of D&apos;Footprint. Unauthorized use is prohibited.
                </p>
              ),
            },
          ].map(({ id, title, content }) => (
            <section
              id={id}
              key={id}
              className="mb-16"
              ref={(el) => (sectionsRef.current[id] = el)}
            >
              <h2 className="text-2xl font-bold mb-6 text-secondary dark:text-darkAccent">
                {title}
              </h2>
              {content}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
